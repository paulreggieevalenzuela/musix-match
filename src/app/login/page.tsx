"use client";
import Link from "next/link";
import React, { forwardRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import LoginLayout from '@/components/layouts/LoginLayout';
import Button from '@/components/buttons/Button';
import Loading from '@/components/Loading';
import NextImage from '@/components/NextImage';
import { Input } from '@/components/Input';
import s from './page.module.scss';
import Logo from '~/svg/Logo.svg';
import MusixMatchLogo from '~/images/musix.svg.png';

type FormValues = {
    username?: string;
    password?: string;
};

const InputRef = forwardRef((props: any, ref: any) => {
    return (
        <div ref={ref}>
            <Input {...props} />
        </div>
    );
});

export default function LoginPage() {
    const requiredMessage = 'This field is required';
    const router = useRouter();
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState(false);

    const validation = yup.object().shape({
        username: yup
            .string()
            .email('Enter a valid username')
            .required(requiredMessage),
        password: yup.string().required(requiredMessage),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormValues>({
        resolver: yupResolver(validation),
        defaultValues: {
            username: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data, e: any) => {
        console.log('user', data);
        try {
            const res = await signIn("credentials", {
                data,
                redirect: false,
            });
            console.log('res', res);
            // setLoading(true);
            // router.push("/dashboard");
        } catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            // setLoading(false);
        }
    }

    return (
        <LoginLayout className={s.Page}>
            <div className={s.left}>
                <NextImage src={MusixMatchLogo} height={100} width={100} alt="Musix Match" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.right}>
                <div className={s.rightContent}>
                    <h2>Welcome!</h2>
                    <div className={s.formContainer}>
                        <InputRef
                            className={s.InputContainer}
                            label='Username'
                            {...register('username')}
                            placeholder="Email Address"
                            messageType={errors.username && 'error'}
                            messageText={errors.username && errors.username.message}
                        />
                        <InputRef
                            className={s.InputContainer}
                            label='Password'
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register('password')}
                            messageType={errors.password && 'error'}
                            messageText={errors.password && errors.password.message}
                        />
                    </div>
                    <div className={s.cta}>
                        {loading && <Loading />}
                        <Button type='submit'>
                            Login
                        </Button>
                        <Button className={s.ctaForgot}>
                            Forgot your password?
                        </Button>
                    </div>
                </div>
            </form>
        </LoginLayout>
    )

}