'use client'
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { uploadFileToS3 } from "@/app/lib/s3/s3";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from 'next-auth/react';
import { montserrat300 } from "@/app/fonts/montserrat";
import { useRouter } from "next/navigation";


import axios from 'axios';
import Loading from "../ui/Loading/loading";
const mainVariant = {
    initial: {
        x: 0,
        y: 0,
    },
    animate: {
        x: 20,
        y: -20,
        opacity: 0.9,
    },
};

const secondaryVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
};

type MutateArgs = {
    fileKey: string,
    fileName: string
}


export const FileUpload = ({
    onChange,
}: {
    onChange?: (files: File[]) => void;
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
        }
    })


    const { mutate, isPending } = useMutation({
        mutationFn: async (data?: MutateArgs) => {
            if (data) {
                const { fileName, fileKey } = data;
                const response = await axios.post('/api/create-chat', {
                    createdBy: session?.user?.id, fileName, fileKey
                })
                console.log(response.data)
                return response.data
            }
            return
        }
    })

    const handleFileChange = async (newFiles: File[]) => {

        const file = newFiles[0]
        if (!file) {
            return
        }
        if (file.size > 10 * 1024 * 1024) {
            toast({
                title: "Something went wrong",
                description: "Kinldy upload file less than 10 mb",
            })
            return
        }
        setUploading(true)
        const data = await uploadFileToS3(file);
        if (!data?.fileKey || !data.fileName) {
            toast({
                title: "File upload failed",
                description: "Couldn't upload the file in cloud, kindly try again later",
            })
            setUploading(false)
            return
        }


        mutate(data, {
            onSuccess: ({ chat }) => {
                setUploading(false)
                console.log(chat)
                toast({
                    title: "Chat has been created.",
                    description: `Chat has been created with file, ${data.fileName}.`
                })
                router.push(`/chats/${chat.id}`)
            },
            onError: (error: any) => {
                console.log(error)
                setUploading(false)
                toast({
                    title: "Error creating a chat."
                })
            }
        })
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const { getRootProps, isDragActive } = useDropzone({
        multiple: false,
        noClick: true,
        onDrop: handleFileChange,
        onDropRejected: (error) => {
            console.log(error);
        },
    });

    return (
        <div className={cn("w-full", montserrat300.className)}  {...getRootProps()}>
            <motion.div
                onClick={handleClick}
                whileHover="animate"
                className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
            >
                <input
                    ref={fileInputRef}
                    id="file-upload-handle"
                    type="file"
                    onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
                    className="hidden"
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                    <GridPattern />
                </div>
                {
                    uploading || isPending ? <Loading status="Spilling the tea to AI, kindly wait." /> : (
                        <div className="flex flex-col items-center justify-center">
                            <p className="relative z-20 font-sans font-normal text-center text-black dark:text-neutral-400 text-base mt-2">
                                Drag or drop your files here or click to upload
                            </p>
                            <div className="relative w-full mt-10 max-w-xl mx-auto">
                                {files.length > 0 &&
                                    files.map((file, idx) => (
                                        <motion.div
                                            key={"file" + idx}
                                            layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                                            className={cn(
                                                "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                                                "shadow-sm"
                                            )}
                                        >
                                            <div className="flex justify-between w-full items-center gap-4">
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    layout
                                                    className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                                                >
                                                    {file.name}
                                                </motion.p>
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    layout
                                                    className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                                                >
                                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                </motion.p>
                                            </div>

                                            <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    layout
                                                    className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                                                >
                                                    {file.type}
                                                </motion.p>

                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    layout
                                                >
                                                    modified{" "}
                                                    {new Date(file.lastModified).toLocaleDateString()}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    ))}
                                {!files.length && (
                                    <motion.div
                                        layoutId="file-upload"
                                        variants={mainVariant}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20,
                                        }}
                                        className={cn(
                                            "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                                            "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                                        )}
                                    >
                                        {isDragActive ? (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-neutral-600 flex flex-col items-center"
                                            >
                                                Drop it
                                                <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                            </motion.p>
                                        ) : (
                                            <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                                        )}
                                    </motion.div>
                                )}

                                {!files.length && (
                                    <motion.div
                                        variants={secondaryVariant}
                                        className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                                    ></motion.div>
                                )}
                            </div>
                        </div>
                    )
                }
            </motion.div>
        </div>
    );
};

export function GridPattern() {
    const columns = 41;
    const rows = 11;
    return (
        <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
            {Array.from({ length: rows }).map((_, row) =>
                Array.from({ length: columns }).map((_, col) => {
                    const index = row * columns + col;
                    return (
                        <div
                            key={`${col}-${row}`}
                            className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${index % 2 === 0
                                ? "bg-gray-50 dark:bg-neutral-950"
                                : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
                                }`}
                        />
                    );
                })
            )}
        </div>
    );
}
