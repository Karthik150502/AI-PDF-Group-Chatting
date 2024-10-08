'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

import { z } from 'zod';

import CmsInputError from './cms_signin_error_msg';
let SigninEmail = z.string().email("Kindly enter a valid email.");
let SigninPassword = z.string().min(1, "Kindly enter the password.")
type InputFieldValidation = {
    email: string,
    password: string
}

const emailDomains = [
    'gmail.com',
    'yahoo.com',
    'outlook.com',
    'icloud.com',
    'hotmail.com',
    'rediffmail.com',
];

const Signin = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [checkingPassword, setCheckingPassword] = useState(false);

    const [suggestedDomains, setSuggestedDomains] =
        useState<string[]>(emailDomains);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const passwordRef = useRef<HTMLInputElement>(null);
    const suggestionRefs = useRef<HTMLLIElement[]>([]);

    const [inputErrors, setInputErrors] = useState<InputFieldValidation>({} as InputFieldValidation);


    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState: any) => !prevState);
    }
    const router = useRouter();
    const email = useRef('');
    const password = useRef('');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        password.current = e.target.value;


        // Validation
        let passwordValidation = SigninPassword.safeParse(e.target.value)
        if (!passwordValidation.success) {
            setInputErrors(prev => ({
                ...prev, password: passwordValidation?.error?.issues[0].message
            }))
            return;
        }
        setInputErrors(prev => ({
            ...prev, password: ''
        }))



    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {



        const value = e.target.value;
        email.current = value;

        // Validation
        let emailValidation = SigninEmail.safeParse(e.target.value)
        if (!emailValidation.success) {
            setInputErrors(prev => ({
                ...prev, email: emailValidation?.error?.issues[0].message
            }))
            return;
        }

        setInputErrors(prev => ({
            ...prev, email: ''
        }))
        setFocusedIndex(0);


        if (!value.includes('@')) {
            setSuggestedDomains(emailDomains);
            return;
        }

        const [, currentDomain] = value.split('@');
        // Check for exact matches and filter for partial matches
        const exactMatch = emailDomains.find((domain) => domain === currentDomain);
        if (exactMatch) {
            setSuggestedDomains([]);
            return;
        }

        const matchingDomains = emailDomains.filter((domain) =>
            domain.startsWith(currentDomain),
        );
        setSuggestedDomains(matchingDomains);
    };

    const handleSuggestionClick = (domain: string) => {
        const [username] = email.current.split('@');
        const newEmail = `${username}@${domain}`;
        email.current = newEmail;
        passwordRef.current?.focus();
        setSuggestedDomains([]);
    };

    // Handle keyboard events for navigating and selecting suggestions
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && focusedIndex >= 0 && suggestedDomains.length > 0) {
            handleSuggestionClick(suggestedDomains[focusedIndex]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setFocusedIndex((prevIndex) =>
                Math.min(prevIndex + 1, suggestedDomains.length - 1),
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        }
    };

    const handleSubmit = async (e?: React.FormEvent<HTMLButtonElement>) => {
        const loadId = toast.loading('Signing in...');
        if (e) {
            e.preventDefault();
        }


        setCheckingPassword(true);
        const res = await signIn('credentials', {
            username: email.current,
            password: password.current,
            redirect: false,
        });

        toast.dismiss(loadId);
        if (!res?.error) {
            router.push('/');
            toast.success('Signed In');
        } else {
            toast.error('oops something went wrong..!');
            setCheckingPassword(false);
        }
    };
    return (
        <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                    type: 'spring',
                    damping: 10,
                }}
                className="flex w-full flex-col justify-between gap-12 rounded-2xl bg-primary/5 p-8 md:max-w-[30vw]"
            >
                <div className="flex flex-col text-center">
                    <h2 className="text-3xl font-semibold tracking-tighter md:text-4xl">
                        Welcome to{' '}
                        <span className="bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1 font-black tracking-tighter text-transparent">
                            100xDevs
                        </span>
                    </h2>
                    <p className="text-lg font-medium tracking-tighter text-primary/75 md:text-xl text-white">
                        Log in to access paid content!
                    </p>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="grid w-full items-center gap-4">
                        <div className="relative flex flex-col gap-2">
                            <Label htmlFor="email">
                                <div className='my-1 flex w-full items-center justify-between '>
                                    <p>Email</p>
                                    {inputErrors.email && <CmsInputError message={inputErrors.email} />}
                                </div>
                                <Input
                                    className="focus:ring-none border-none bg-primary/5 focus:outline-none my-1"
                                    name="email"
                                    id="email"
                                    placeholder="name@email.com"
                                    value={email.current}
                                    onChange={handleEmailChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </Label>

                            {email.current && suggestedDomains.length > 0 && (
                                <ul
                                    className={`absolute top-20 z-50 max-h-96 w-full min-w-[8rem] overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
                                >
                                    {suggestedDomains.map((domain: string, index: number) => (
                                        <>
                                            <li
                                                key={domain}
                                                value={domain}
                                                //@ts-ignore
                                                ref={(listItem) =>
                                                    (suggestionRefs.current[index] = listItem!)
                                                }
                                                onClick={() => handleSuggestionClick(domain)}
                                                className={`relative flex w-full cursor-default select-none items-center rounded-sm p-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${focusedIndex === index
                                                    ? 'bg-primary-foreground font-medium'
                                                    : ''
                                                    }`}
                                            >
                                                {email.current.split('@')[0]}@{domain}
                                            </li>
                                            {index < suggestedDomains.length - 1 && <Separator />}
                                        </>
                                    ))}
                                </ul>
                            )}

                        </div>
                        <div className="relative flex flex-col gap-2">
                            <Label htmlFor="password">
                                <div className='my-1 flex w-full items-center justify-between '>
                                    <p>Password</p>
                                    {inputErrors.password && <CmsInputError message={inputErrors.password} />}
                                </div>
                                <Input
                                    className="focus:ring-none border-none bg-primary/5 focus:outline-none my-1 "
                                    name="password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    id="password"
                                    placeholder="••••••••"
                                    ref={passwordRef}
                                    onChange={handlePasswordChange}
                                    onKeyDown={async (e) => {
                                        if (e.key === 'Enter') {
                                            setIsPasswordVisible(false);
                                            handleSubmit();
                                        }
                                    }}
                                />
                            </Label>
                            <button
                                className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-neutral-500"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <EyeOff strokeWidth={1} />
                                ) : (
                                    <Eye strokeWidth={1} />
                                )}
                            </button>

                        </div>
                    </div>
                    <Button
                        size={'lg'}
                        variant={'secondary'}
                        disabled={!!inputErrors.email || !!inputErrors.password || checkingPassword}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </div>
            </motion.div>
            <div className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]" />
        </section>
    );
};

export default Signin;
