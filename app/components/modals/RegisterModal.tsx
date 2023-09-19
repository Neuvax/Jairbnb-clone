'use client';

import axios from 'axios';  
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle,  } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import { CiMail } from 'react-icons/ci';
import { BsPhone } from 'react-icons/bs';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    useForm,
    SubmitHandler
} from "react-hook-form";

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          name: '',
          email: '',
          password: ''
        },  
      });
      
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
 
        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();    
            })
            .catch((error) => {
                toast.error("Error creating account")
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Heading 
            title= "Welcome to Airbnb"
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
                id = "name"
                label = "Name"
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
                label="Continue with Facebook"
                icon={ FaFacebookSquare }
                onClick={() => {}}
            />
            <Button 
                outline
                label="Continue with Google"
                icon={ FcGoogle }
                onClick={() => {}}
            />
            <Button 
                outline
                label="Continue with Apple"
                icon={ AiFillApple }
                onClick={() => {}}
            />
            
            <Button 
                outline
                label="Continue with Phone"
                icon={ BsPhone }
                onClick={() => {}}
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
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;