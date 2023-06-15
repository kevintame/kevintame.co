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
            <Tool title="14” MacBook Pro, M1 Max, 64GB RAM (2021)">
            The new Apple chips are just better than the Intel ones. My computer fans rarely turn on, and I’m able to have a million things open. It’s a great computer.
            </Tool>
            <Tool title="Apple Magic Trackpad">
            I only use a mouse when playing Minecraft with my kids. There is just something very pleasing to me about using the trackpad.          
            </Tool>
          </ToolsSection>
          <ToolsSection title="Development Tools">
            <Tool title="VS Code">
            It’s good, and I don’t have any complaints. I still use Sublime Text here and there, but for the most part, I mostly use this. 
            </Tool>
            <Tool title="Terminal">
            I know people like iTerm, but I don’t even know the benefits I get by using it. So I just have stuck with the built-in terminal.
            </Tool>
          </ToolsSection>
          <ToolsSection title="Design">
            <Tool title="Sketch">
            I love the speed at which I can design things. It probably doesn’t have all the bells and whistles of other design tools, but it’s lightweight and easy to use. 
            </Tool>
            <Tool title="Affinity Suite">
            I look at Affinity as a perfect alternative to the Adobe Suite. It’s cheap, easy to use, and very powerful. 
            </Tool>
          </ToolsSection>
          <ToolsSection title="Productivity">
            <Tool title="Things">
            For more than a decade, the Things app has been helping me stay organized on tasks I need to get done.  
            </Tool>
            <Tool title="Magnet">
            Being able to use hotkeys to size your computer windows is so useful. Come on, Apple, why haven’t you figured this out and made it native? 
            </Tool>
          </ToolsSection>
          <ToolsSection title="Devices">
            <Tool title="Switch OLED">
             Nintendo’s lack of quality family sharing pisses me off, but I can’t deny it’s one of the best gaming consoles ever made. It’s my go-to for video game fun.
            </Tool>
            <Tool title="iPhone">
            The blue bubble in messages makes me feel like less of an outsider. 🤣
            </Tool>
            <Tool title="Beyerdynamic DT 770">
            When I bought these headphones in 2002 for $150, every one of my friends thought I was crazy to pay that much for headphones. That price doesn’t seem too crazy now. I’ve owned a few pairs over the years, and they are truly brilliant headphones. 
            </Tool>
          </ToolsSection>
          <ToolsSection title="Adventure Gear">
            <Tool title="Burton Custom 162">
            I’ve been riding a custom for a long time, and every time I try another board, it just doesn’t cut it for me.
            </Tool>
            <Tool title="Black Diamond Helio 105">
            I’m not a great skier, but these things are light and great for uphill travel. I’ve been very pleased with them, and I think you would like them to.
            </Tool>
            <Tool title="Danner Mountain 600">
            My dad had Danner boots when I was growing up. I’ve been rocking Danners since 1997 and have never looked back. 
            </Tool>
          </ToolsSection>
          <ToolsSection title="Board Games">
            <Tool title="Android: Netrunner">
            Netrunner is a two-player asymmetric card game set in a dystopian future where four megacorporations control almost every aspect of daily life. Legendary hackers known as “runners” aim to fight the corps’ influence by hacking into their servers and preventing them from advancing their sinister agendas.
            </Tool>
            <Tool title="Terra Mystica">
            Terra Mystica is an economic and territory-building game that rewards long-term planning and engine building.
            </Tool>
            <Tool title="Agricola">
            Agricola is the classic game where players take on the role of 17th-century farmers and guide their families to wealth, health, and prosperity. Every game challenges players to make different strategic choices. The player who establishes the best farmyard wins!
            </Tool>
            <Tool title="Power Grid">
            In the game, each player represents a company that owns power plants and tries to supply electricity to cities. During the game, players bid on power plants and buy resources to provide electricity to the growing number of cities in their network. It was one of the most brilliant market systems in a game. 
            </Tool>
          </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
