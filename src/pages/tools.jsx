import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
      <Head>
        <title>Tools - Kevin Tame</title>
        <meta
          name="description"
          content="Software I use, gadgets I love, and other things I recommend."
        />
      </Head>
      <SimpleLayout
        title="Tools I use and recommend to others."
        intro="Here’s a list of some of the things I use regularly and really like."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="14” MacBook Pro, M4, 64GB RAM (2024)">
              The new Apple chips are just better than the Intel ones. My
              computer fans rarely turn on, and I’m able to have a million
              things open. It’s a great computer.
            </Tool>
            <Tool title="Apple Magic Trackpad">
              I only use a mouse when playing Minecraft with my kids. There’s
              just something very pleasing to me about using the trackpad.
            </Tool>
            <Tool title="13” iPad Pro with Nano Texture">
              In my design work, I do a lot of storyboarding and sketching. The
              nano texture is really nice for sketching.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Development Tools">
            <Tool title="VS Code">
              It’s good, and I don’t have any complaints. I still use Sublime
              Text here and there, but for the most part, I use this.
            </Tool>
            <Tool title="Terminal">
              I know people like iTerm, but I’m not even sure what benefits it
              offers. So I’ve just stuck with the built-in Terminal.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Design">
            <Tool title="Figma">
              I used to be an avid Sketch user, but Figma has become so good—and
              the industry standard for design.
            </Tool>
            <Tool title="Procreate">
              I think it might be the best sketching software for the iPad out
              there.
            </Tool>
            <Tool title="Affinity Suite">
              I see Affinity as the perfect alternative to the Adobe Suite. It’s
              affordable, easy to use, and very powerful.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Productivity">
            <Tool title="Things">
              For more than a decade, the Things app has helped me stay
              organized with the tasks I need to get done.
            </Tool>
            <Tool title="Obsidian">
              I love being able to keep all my notes as markdown files. The
              customization options are another great reason to use Obsidian.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Homelab">
            <Tool title="Proxmox">
              My favorite hypervisor by far. I love creating LXCs to run all of
              my services.
            </Tool>
            <Tool title="Open Web UI">
              Great interface for running local LLMs.
            </Tool>
            <Tool title="Plex">
              I run my movies, TV shows, and audiobooks through a Plex server.
            </Tool>
            <Tool title="Arrs">If you know, you know.</Tool>
            <Tool title="Komga">My comic and manga server.</Tool>
            <Tool title="Immich">
              I was tired of paying extra for iCloud storage, so I moved all of
              our photos to a locally hosted photo service.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Devices">
            <Tool title="Switch OLED">
              Nintendo’s lack of quality family sharing frustrates me, but I
              can’t deny it’s one of the best gaming consoles ever made. It’s my
              go-to for video game fun.
            </Tool>
            <Tool title="iPhone">
              The blue bubble in Messages makes me feel like less of an
              outsider. 🤣
            </Tool>
            <Tool title="Beyerdynamic DT 770">
              When I bought these headphones in 2002 for $150, all my friends
              thought I was crazy for spending that much. That price doesn’t
              seem so crazy now. I’ve owned a few pairs over the years, and
              they’re truly brilliant headphones.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Adventure Gear">
            <Tool title="Burton Custom 162">
              I’ve been riding a Custom for a long time, and every time I try
              another board, it just doesn’t cut it for me.
            </Tool>
            <Tool title="Atomic Bent Chetlers">
              I’m newer to skiing, but I love these for the resort.
            </Tool>
            <Tool title="Dynastar Tour 99">
              I’m not a great skier, but these are light and great for uphill
              travel. I’ve been very pleased with them, and I think you would
              like them too.
            </Tool>
            <Tool title="Dynafit Radical Pro Boots">
              It took me a long time.
            </Tool>
            <Tool title="Brooks Cascadia">My favorite trail runners.</Tool>
            <Tool title="Danner Mountain 600">
              My dad had Danner boots when I was growing up. I’ve been rocking
              Danners since 1997 and have never looked back.
            </Tool>
          </ToolsSection>

          <ToolsSection title="Board Games">
            <Tool title="Android: Netrunner">
              Netrunner is a two-player asymmetric card game set in a dystopian
              future where four megacorporations control almost every aspect of
              daily life. Legendary hackers known as “runners” aim to fight the
              corps’ influence by hacking into their servers and preventing them
              from advancing their sinister agendas.
            </Tool>
            <Tool title="Terra Mystica">
              Terra Mystica is an economic and territory-building game that
              rewards long-term planning and engine building.
            </Tool>
            <Tool title="Agricola">
              Agricola is a classic game where players take on the role of
              17th-century farmers and guide their families to wealth, health,
              and prosperity. Every game challenges players to make different
              strategic choices. The player who establishes the best farmyard
              wins!
            </Tool>
            <Tool title="Power Grid">
              In this game, each player represents a company that owns power
              plants and tries to supply electricity to cities. Players bid on
              power plants and buy resources to power the growing number of
              cities in their network. It has one of the most brilliant market
              systems in gaming.
            </Tool>
            <Tool title="Gloomhaven and Frosthaven">
              My gaming group and I have been playing this consistently for
              several years. It’s a commitment, but very fun.
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
