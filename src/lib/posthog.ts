import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_uqxfBPNQBL9g4SJr6tAijzByZsByCD4KyrLXxCLLQqLJ';
const POSTHOG_HOST = 'https://us.posthog.com';

export const initPostHog = () => {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
  });
};

export { posthog };
