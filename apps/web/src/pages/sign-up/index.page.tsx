import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import {
  Button,
  Stack,
  TextInput,
  PasswordInput,
  Group,
  Title,
} from '@mantine/core';

import { RoutePath } from 'routes';
import { handleError } from 'utils';
import { Link } from 'components';

import { accountApi, accountConstants } from 'resources/account';
import { Tips } from './components';

const schema = z.object({
  email: z.string().regex(accountConstants.emailRegex, 'Email format is incorrect.'),
  password: z.string().regex(accountConstants.passwordRegex, 'The password must contain from 8 to 50 characters with at least one number (0-9) and at least one lover case (a-z) and capital letter (A-Z).'),
});

type SignUpParams = z.infer<typeof schema>;

const passwordRules = [
  {
    title: 'Must be at least 8 characters',
    done: false,
  },
  {
    title: 'Must contain at least 1 number',
    done: false,
  },
  {
    title: 'Must contain lover case and capital letters',
    done: false,
  },
];

const SignUp: NextPage = () => {
  const [passwordRulesData, setPasswordRulesData] = useState(passwordRules);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpParams>({
    resolver: zodResolver(schema),
  });

  const { mutate: signIn, isLoading: isSignInLoading } = accountApi.useSignIn<SignUpParams>();

  const passwordValue = watch('password', '');

  useEffect(() => {
    const updatedPasswordRulesData = [...passwordRules];

    updatedPasswordRulesData[0].done = passwordValue.length >= 8;
    updatedPasswordRulesData[1].done = /\d/.test(passwordValue);
    const hasLowercase = /[a-z]/.test(passwordValue);
    const hasUppercase = /[A-Z]/.test(passwordValue);

    updatedPasswordRulesData[2].done = hasLowercase && hasUppercase;

    setPasswordRulesData(updatedPasswordRulesData);
  }, [passwordValue]);

  const { mutate: signUp, isLoading: isSignUpLoading } = accountApi.useSignUp<SignUpParams>();

  const onSubmit = (data: SignUpParams) => signUp(data, {
    onSuccess: () => signIn(data, {
      onError: (e) => handleError(e, setError),
    }),
    onError: (e) => handleError(e, setError),
  });

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>

      <Stack sx={{ width: '408px' }} spacing={32}>
        <Title order={2}>Sign Up</Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={20}>
            <TextInput
              {...register('email')}
              label="Email Address"
              placeholder="Email Address"
              error={errors.email?.message}
              labelProps={{ style: { marginBottom: '8px' } }}
            />

            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Enter password"
              error={errors.password?.message}
              labelProps={{ style: { marginBottom: '8px' } }}
            />
            <Tips passwordRulesData={passwordRulesData} />
          </Stack>

          <Button
            type="submit"
            loading={isSignUpLoading || isSignInLoading}
            fullWidth
            mt={32}
          >
            Sign Up
          </Button>
        </form>

        <Group sx={{ fontSize: '16px', justifyContent: 'center' }} spacing={12}>
          Have an account?

          <Link
            type="router"
            href={RoutePath.SignIn}
            inherit
            underline={false}
          >
            Sign In
          </Link>
        </Group>
      </Stack>
    </>
  );
};

export default SignUp;
