'use client';

import axios from 'axios';  
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
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
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Heading 
            title= "Welcome to Airbnb"
            subtitle= "Create an account to get started"
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
        </form>
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
        />
    );
}

export default RegisterModal;