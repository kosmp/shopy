import { FC } from 'react';
import { Group, Stack, Text } from '@mantine/core';
import { CheckCircle } from 'public/icons';

interface PasswordRule {
  title: string;
  done: boolean;
}

interface TipsProps {
  passwordRulesData: PasswordRule[];
}

const Tips : FC<TipsProps> = ({ passwordRulesData }) => (
  <Stack>
    {!passwordRulesData[0].done && (
    <Group spacing={12}>
      <CheckCircle />

      <Text color="#A3A3A3">
        Must be at least 8 characters
      </Text>
    </Group>
    )}
    {!passwordRulesData[1].done && (
      <Group spacing={12}>
        <CheckCircle />

        <Text color="#A3A3A3">
          Must contain at least 1 number
        </Text>
      </Group>
    )}
    {!passwordRulesData[2].done && (
      <Group spacing={12}>
        <CheckCircle />

        <Text color="#A3A3A3">
          Must contain lover case and capital letters
        </Text>
      </Group>
    )}
  </Stack>
);

export default Tips;
