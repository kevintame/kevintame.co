import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import avatarImage from '@/images/avatar.jpg'
import logoEddee from '@/images/logos/eddee.svg'
import logoSoar from '@/images/logos/soar.svg'
import logoNSG from '@/images/logos/nsg.svg'
import logoRats from '@/images/logos/rats.svg'
import logoUrbanteachers from '@/images/logos/urbanteachers.svg'
import logoTFA from '@/images/logos/tfa.svg'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Vivint Smart Home',
      title: 'Lead UX Designer - AI',
      logo: logoSoar,
      start: '2025',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Eddee',
      title: 'Co-Founder and CEO',
      logo: logoEddee,
      start: '2012',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Worplace AI a Soar Company',
      title: 'Director of Product and Design - AI',
      logo: logoSoar,
      start: '2023',
      end: '2025',
    },
    {
      company: 'Null Signal Games',
      title: 'VP of Product',
      logo: logoNSG,
      start: '2018',
      end: '2025',
    },
    {
      company: 'Thrive Software',
      title: 'Co-Founder and CPO',
      logo: logoRats,
      start: '2018',
      end: '2023',
    },
    {
      company: 'City Teaching Alliance formerly Urban Teachers',
      title: 'Director of Technology',
      logo: logoUrbanteachers,
      start: '2014',
      end: '2018',
    },
    {
      company: 'Teach for America',
      title: 'Director of UX, Corp Member',
      logo: logoTFA,
      start: '2010',
      end: '2014',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt={role.company}
                className="h-7 w-7"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      {/* TODO: Resume PDF is dated June 2023 — update with current version */}
      <Button
        href="/resume/KevinTameResume6.2023.pdf"
        download
        target="_blank"
        variant="secondary"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}


export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Kevin Tame - Product and Design Leader</title>
        <meta
          name="description"
          content="I’m Kevin Tame, a designer, entrepreneur, husband, father, educator, outdoorsman, and board gamer. I'm currently trying to build AI technology experiences to help empower every person to reach their fullest potential."
        />
      </Head>
      <Container className="mt-9">
        <div className="lg:flex lg:items-center lg:gap-x-12">
          <div className="flex justify-center lg:flex-shrink-0 lg:order-last">
            <Image
              src={avatarImage}
              alt="Kevin Tame"
              className="h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80 lg:h-96 lg:w-96"
              priority
            />
          </div>
          <div className="mt-10 lg:mt-0 max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Product leader, founder, designer, and amateur adventurer.
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              Hi, I'm Kevin Tame.👋🏻
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400">
              I'm a designer, entrepreneur, husband, father, educator,
              outdoorsman, and board gamer. I'm currently trying to build AI
              technology experiences to help empower every person to reach their
              fullest potential.
            </p>
            <div className="mt-6 flex gap-6">
              <SocialLink
                href="https://twitter.com/kevintame"
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
              <SocialLink
                href="https://instagram.com/kevintame"
                aria-label="Follow on Instagram"
                icon={InstagramIcon}
              />
              <SocialLink
                href="https://github.com/kevintame"
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
              <SocialLink
                href="https://www.linkedin.com/in/kevintame/"
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            </div>
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <Resume />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
