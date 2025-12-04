import { getAlbums } from '@/lib/api';
import Globe from '@/lib/globes/mini-globe';
import Nav from '@/lib/nav';
import Noise from '@/lib/fx/noise';
import { ExternalLink } from '@/lib/external-link';
import { FaDiscord } from 'react-icons/fa';

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function generateStaticParams() {
  return [];
}

function Contact() {
  return (
    <div id="contact" className="flex gap-14">
      {/* Socials */}
      <div>
        <h2 className="uppercase tracking-tight text-sm mb-1 font-light text-gray-500">
          Socials
        </h2>
        <ul className="text-lg font-medium space-y-2">
          <li className="flex items-center gap-2">
             <img src="/link.gif" alt="linkedin" className="w-12 sm:w-12 h-auto" />
            <ExternalLink href="https://www.linkedin.com/in/zeyu-li-889325358/">
              LinkedIn
            </ExternalLink>
          </li>
     <li className="flex items-center gap-2">
  <img src="/github.gif" alt="Personal" className="w-12 sm:w-16 h-auto" />
  <ExternalLink href="https://github.com/megawall212">GitHub</ExternalLink>
</li>


          <li className="flex items-center gap-2">
            <img src="/ins.gif" alt="ins" className="w-12 sm:w-12 h-auto" />
            <ExternalLink href="https://www.instagram.com/jlrandom12">Instagram</ExternalLink>
          </li>
          <li className="flex items-center gap-2">
            <img src="gear.gif" alt="settings" className="w-12 sm:w-12 h-auto" />
            <ExternalLink href="https://yourworkwebsite.com">Work Website</ExternalLink>
          </li>
        </ul>
      </div>

      {/* Personal Links */}
      <div className="border border-dashed border-gray-300 rounded-lg p-4 -mt-4 flex flex-wrap gap-4">

        <h2 className="uppercase tracking-tight text-sm mb-1 font-light text-gray-500">
          Personal Links
        </h2>
        <ul className="text-lg font-medium space-y-2">
          <li className="flex items-center gap-2">
            <img src="/discord.gif" alt="discord" className="w-12 sm:w-16 h-auto" />
            <ExternalLink href="https://discord.com/users/ggsmd1202">Discord</ExternalLink>
          </li>
          <li className="flex items-center gap-3">
            <img src="/Keqing.gif" alt="Personal" className="w-12 sm:w-16 h-auto" />
            <ExternalLink href="https://yourpersonalblog.com">Personal Blog</ExternalLink>
          </li>
          <li className="flex items-center gap-2">
            <img src="/hutao.gif" alt="Personal" className="w-12 sm:w-16 h-auto" />
            <ExternalLink href="https://otherphotogallery.com">Other Photo Gallery</ExternalLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

async function AboutPage() {
  const albums = await getAlbums();

  return (
    <section
      className={`flex flex-col sm:flex-row
        pt-10 sm:pt-5 sm:pb-5
        h-lvh max-sm:h-full max-sm:overflow-y-auto`}
    >
      <div
        className={`
           mx-auto sm:mx-0 sm:pt-24 sm:pl-20 sm:pr-30 space-y-1
           w-[320px]`}
      >
        <Nav albums={albums} />
      </div>

      <div
        className={`rounded-tl-xl rounded-bl-xl bg-gray-100
          px-9 py-8 pt-20
          w-full relative overflow-hidden`}
      >
        <section className="z-20 relative max-w-96">
          <h1 className="font-bold text-4xl tracking-tight">Johnson!</h1>
          <p className="text-2xl text-gray-700 font-light">
            <p className="mt-4 text-2xl text-gray-700 font-light"></p>
            
            <span className="text-gray-300">✦</span> Photography Gallery
          </p>

          <p className="mt-20 mb-5 text-lg">{`
        I'm a software developer from Florida that's super inspired by a lot of different things. Thanks for checking out the site!
        `}</p>

          <p className="mb-32 text-lg">
            The website is built with TypeScript and
            React, and hosted using Pages and Contentful.
          </p>

          <Contact />
        </section>

        <Globe
          albums={albums}
          className={`-bottom-72 -right-48 max-sm:-bottom-36 max-sm:-right-40
            max-w-[1024px] max-sm:w-[768px]
            fade-in`}
        />
        {/* Overlap Globe to fade in the edges */}
        <div
          aria-hidden={true}
          className={`
            absolute -bottom-72 -right-48 pointer-events-none
            rounded-full border-[100px] border-gray-100
            max-xl:hidden max-w-[1024px]`}
          style={{
            width: 1000,
            height: 1000,
            boxShadow: 'inset 0 0 50px 125px rgb(250 250 255 / 50%)'
          }}
        />
        <Noise />
      </div>
    </section>
  );
}

export default AboutPage;
