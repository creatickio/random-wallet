import Nav from "@/components/nav/page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function TOS() {
  const supabase = createClientComponentClient();
  let { data: settings, error } = await supabase.from("settings").select("*");
  return (
    <div className="flex flex-col gap-2 p-2 scroll-smooth">
      <Nav />
      {/* Content */}
      <div className="py-16 md:py-[100px] lg:py-[150px] px-8 md:px-16 lg:px-40 flex flex-col gap-6 items-start justify-start text-left rounded-lg border border-border">
        <h1 className="text-2xl font-bold">Terms of Services</h1>
        <p>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
          nesciunt adipisci possimus molestias expedita, earum dignissimos
          voluptate, aspernatur iste exercitationem error? Cum nostrum rerum
          odio aut necessitatibus deserunt. Soluta, harum? Officiis amet aperiam
          saepe qui laboriosam obcaecati cumque corporis reiciendis sequi, vero
          accusamus tempore itaque facilis voluptatum nam sint doloremque,
          ducimus unde ea, voluptatem accusantium ipsum. Omnis id doloremque
          maxime? Cupiditate, recusandae ab quae harum aut omnis! Consequatur
          pariatur, modi odio inventore nihil ullam architecto minus repudiandae
          consectetur veniam. Consectetur odio iure sit? Asperiores accusamus
          possimus cupiditate corrupti non tenetur. Sint expedita vero
          blanditiis beatae.
        </p>

        <p>
          Nemo optio nam accusantium repudiandae tempora repellat, aliquam
          dolorem excepturi itaque nisi, fugit culpa facere et aliquid quaerat!
          Debitis blanditiis harum dolorum quam? Tenetur, minima. Sunt
          asperiores ullam blanditiis consequatur minus. Sapiente repellat
          ratione laudantium magni quis similique? Recusandae totam incidunt
          corrupti quos harum doloremque, amet fugiat, assumenda aliquam magnam
          consequatur ducimus tempora perspiciatis placeat! Tempora sit dolore
          inventore architecto nemo non possimus, illum quasi? Sit adipisci,
          nulla facilis alias debitis sunt illum magni dicta vel corrupti
          architecto magnam quae iure tempore ipsam corporis a. Ex sapiente
          incidunt accusamus in magnam officia nam repellendus natus et quod a
          totam distinctio minus porro id accusantium vitae nisi quasi inventore
          sed, corporis doloribus aliquid eos est. Incidunt. Autem veritatis
          porro, ipsam vero voluptas ab nostrum quam beatae, fugiat,
          perspiciatis sed corrupti asperiores perferendis placeat odio quod
          reprehenderit? Eum esse commodi vel a, eaque odit sequi magni soluta.
          Quis doloremque illum nihil laborum, atque iure debitis consequatur,
          velit error ipsum minus veniam fugiat commodi fugit.
        </p>
        <p>
          Necessitatibus tempora, repellat officiis consectetur, suscipit rerum,
          ut officia ea architecto quod a! Optio vitae aut corrupti velit,
          voluptatem hic blanditiis voluptatibus enim veniam cumque fuga itaque
          voluptatum natus mollitia maxime eveniet ab. Necessitatibus suscipit
          hic, consequuntur molestias id amet assumenda quam velit. Sunt, omnis
          illum? Omnis harum aperiam error porro illum corporis, maiores
          architecto animi minus expedita unde modi ut fugiat earum possimus
          excepturi iusto voluptatem illo sunt dolore. Accusamus, similique
          atque. At, voluptatem nulla repudiandae minima praesentium
          perferendis, explicabo sequi fugiat consequatur excepturi magnam nisi
          debitis repellendus totam perspiciatis doloribus omnis ea? Magnam
          alias libero similique voluptatibus temporibus, accusantium a
          adipisci. Tempora laudantium necessitatibus delectus, inventore
          facilis obcaecati eligendi? Neque impedit consequuntur aperiam natus
          quia soluta laboriosam alias consectetur, architecto praesentium,
          inventore deserunt amet. Illum a officia eum, maxime tempora
          perspiciatis.
        </p>
        <p>
          Impedit voluptatum voluptatibus beatae. Est ex pariatur mollitia,
          minus molestiae veniam laborum blanditiis? Illo unde ea magni qui
          nihil non iure, voluptas temporibus cupiditate, corporis alias sint
          libero veniam animi. Cumque esse natus voluptas consequatur rem ullam
          dolorem incidunt neque quia excepturi earum beatae delectus sint
          accusantium culpa qui ut, ipsam deserunt aliquam nihil. Optio eligendi
          quas laudantium id quia! Voluptas saepe aliquid mollitia veniam sit
          rem, ea deserunt amet obcaecati vel neque similique quidem quod, ullam
          a? Iste eos provident dolorum at explicabo minima ad magnam facilis
          ipsum earum! Dolores itaque nam assumenda iusto alias, excepturi rerum
          quia possimus fuga eaque animi nulla cumque sapiente in deleniti. Rem
          dicta doloremque dolorem id fugit. Reprehenderit minus quidem a
          consequatur mollitia. Obcaecati autem perspiciatis accusamus
          necessitatibus deserunt. Modi iure at eaque beatae? Dicta nulla culpa
          ex blanditiis tempora quod praesentium doloremque, saepe a accusantium
          quos impedit. Quis sequi accusantium esse aliquid. Atque velit itaque
          illo beatae exercitationem nostrum nemo excepturi cum soluta animi
          tenetur nulla nesciunt reprehenderit ducimus tempore at a unde
          perferendis molestiae earum, sapiente, hic blanditiis impedit.
          Laborum, neque. Incidunt unde, suscipit aliquam earum itaque quod
          nulla similique eius error molestiae velit in laboriosam assumenda.
          Velit consequuntur dolore facere, error magni eius voluptas. Adipisci
          assumenda harum voluptas vero enim. Quam deserunt saepe iure non
          facere error ullam alias in omnis illum ipsum obcaecati expedita
          aliquam quae perferendis, id temporibus blanditiis commodi maxime
          autem. Mollitia doloremque et voluptas sit ipsa. Impedit, atque quia!
          Non dicta reprehenderit deserunt earum rem at cumque! Sed, a animi!
          Nesciunt incidunt perspiciatis, ducimus totam a similique non labore
          id et dolores magni error rerum dolorem? Excepturi, at dolore nobis
          vel molestiae hic in aspernatur tempore cum adipisci explicabo
          officiis voluptatem sequi incidunt est accusamus? Nostrum fuga sit,
          autem similique totam consequatur beatae quisquam accusantium tempore.
          Nobis, dolor repellat. Fugit deleniti atque quibusdam, itaque alias
          possimus, aspernatur nobis impedit numquam earum quaerat, facilis
          soluta dignissimos doloremque. Qui ipsum veniam dolore eos
          consequuntur quas temporibus, impedit aliquid.{" "}
        </p>
      </div>
      {/* footer */}
      <footer className="py-[50px] bg-darkBlack text-white rounded-lg flex flex-col gap-[50px] px-6 md:px-8 lg:px-[150px] text-sm">
        {/* top */}
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="py-4 px-8 bg-darkBlack border border-border font-medium text-lg flex items-center justify-center w-fit rounded-lg">
            {settings[0].company_name}
          </div>
          <h4 className="text-4xl md:w-full lg:w-5/12 text-center">
            Create your own crypto wallet and take control of your assets.
          </h4>
        </div>

        {/* bottom */}
        <div className="pt-[50px] border-t border-white/10 flex flex-col md:flex-col gap-[10px] md:gap-[10px] lg:flex-row lg:gap-0 justify-between items-center">
          <p>{settings[0].company_name} © 2023. All rights reserved.</p>

          {/* contact info */}
          <ul className="flex flex-col gap-2 items-center md:flex-row md:gap-8">
            <li>
              <Link
                href={`tel: ${settings[0].phone_number}`}
                className="rounded-full bg-white/5 border border-white/10 py-3 px-4 flex flex-row items-center gap-2 w-fit"
              >
                <Image
                  src="/assets/icons/phone-white.svg"
                  alt="Phone"
                  height={16}
                  width={16}
                />
                {settings[0].phone_number}
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${settings[0].email}`}
                className="rounded-full bg-white/5 border border-white/10 py-3 px-4 flex flex-row items-center gap-2 w-fit"
              >
                <Image
                  src="/assets/icons/envelope-white.svg"
                  alt="Email"
                  height={16}
                  width={16}
                />
                {settings[0].email}
              </Link>
            </li>
            <li>
              <Link
                href={`https://www.google.com/maps/place/${settings[0].location}`}
                className="rounded-full bg-white/5 border border-white/10 py-3 px-4 flex flex-row items-center gap-2 w-fit"
              >
                <Image
                  src="/assets/icons/location-dot-white.svg"
                  alt="Location"
                  height={14}
                  width={14}
                />
                {settings[0].location}
              </Link>
            </li>
          </ul>

          {/* TOS links */}
          <ul className="flex gap-4">
            <li className="underline">
              <Link href="/tos">Terms of Services</Link>
            </li>
            <li className="underline">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default TOS;
