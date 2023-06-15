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
        title="Tools I use and reccomend to others."
        intro="Here’s a big list of some of the stuff I like."
      >
        <div className="space-y-20">
          <ToolsSection title="Workstation">
            <Tool title="14” MacBook Pro, M1 Max, 64GB RAM (2021)">
              The new Apple chips are just better than the intel ones. 
              My computer fans rarely turn on and I’m able to have a million things open. It’s a great computer.
            </Tool>
            <Tool title="Apple Magic Trackpad">
              I only use a mouse when playing minecraft with my kids. 
              There is just something very pleasing to me about using the trackpad. 
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development tools">
            <Tool title="VS Code">
              It’s good and I don’t have any complaints. 
              I still use Sublime Text here and there but for the most part I mostly use this. 
            </Tool>
            <Tool title="Terminal">
              I know people like iTerm but I don’t even know the benefits I get by using it. 
              So I just have stuck with built in terminal.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Sketch">
              I love the speed in which I can design things up. 
              It probably doesn’t have all the bells and whistles of other design tools but it’s light weight and easy to use. 
            </Tool>
            <Tool title="Affinity Suite">
              I look at Affinity as a perfect alternative to the Adobe suite. It’s cheap, easy to use, and very powerful. 
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Things">
              They are incresibley slow to release new features but I still love it as my primary task management tool. 
            </Tool>
            <Tool title="Magnet">
              Being able to use hotkeys to size your computer windows is so useful. 
            </Tool>
          </ToolsSection>
          <ToolsSection title="Fun">
            <Tool title="Switch OLED">
              Nintendo’s lack of quality family sharing pisses me off, 
              but I can’t deny it’s one of the best gaming consoles every made. 
              It’s my go to for video game fun.
            </Tool>
            <Tool title="Burton Custom 162">
              I’ve been riding a custom for a very long time and everytime 
              I try another board it just doesn’t cut it for me. 
            </Tool>
            <Tool title="Black Diamond Helio 105">
              I’m not a great skiier but these things are really light and great for uphill travel. 
              I’ve been very pleased with them and I think you would like them to.
            </Tool>
            <Tool title="Danner Mountain 600">
              My dad had Danner boots when I was growing up. 
              When I finally was old enough to get my own I never looked back. 
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
