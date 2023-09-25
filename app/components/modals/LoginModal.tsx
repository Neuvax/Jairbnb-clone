'use client';

import axios from 'axios'; 
import { signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle,  } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    useForm,
    SubmitHandler,
} from "react-hook-form";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          email: '',
          password: ''
        },  
      });
      
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
 
        signIn('credentials', {
            ...data,
            redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Logged in successfully");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })           
    }

    const bodyContent = (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Heading 
            title= "Welcome back"
            subtitle="Log in to your account"
            />
            <Input 
                id = "email"
                label = "Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id = "password"
                label = "Password"
                type= "password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="flex flex-row items-center gap-1">
            We’ll call or text you to confirm your number. Standard message and data rates apply. 
            <div className="text-black font-medium cursor-pointer underline">Privacy Policy</div>
            </div>
        </form>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button 
                outline
                label="Continue with Google"
                icon={ FcGoogle }
                onClick={() => signIn('google')}
            />
            <Button 
                outline
                label="Continue with Github"
                icon={ AiFillGithub }
                onClick={() => signIn('github')}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={registerModal.onClose}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
        
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Log in"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;