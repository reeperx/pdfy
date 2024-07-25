import Image from "next/image";
import { FileText, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Features } from "@/lib/constants";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <main className="bg-gradient-to-bl from-green-300 to-teal-100 overflow-y-auto hide-scrollbars p-2 lg:p-5 flex-1 w-full h-full">
      <div className="bg-white py-24 sm:py-32 drop-shadow-xl rounded-md max-w-screen overflow-hidden mx-auto">
        <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <div
              className="inline-flex py-1 px-1 pr-4 mb-4 bg-[#5a52ce] rounded-lg"
              role="alert"
            >
              <h2 className="text-base font-semibold leading-7 text-green-600 uppercase tracking-widest typewriter">
                <span className="text-sm bg-primary rounded-lg text-white px-4 py-1.5">
                  Your
                </span>{" "}
                <span className="text-sm font-semibold text-white">
                  Document Companion
                </span>
              </h2>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-light text-gray-900 sm:text-6xl uppercase">
              Your personal AI PDF{" "}
              <span className="text-green-600">summarizer</span>
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Introducing{" "}
              <span className="font-bold text-green-600 uppercase text-[18px]">
                PDFY.
              </span>
              <br /> <br /> Upload your document, and our chatbot will answer
              questions, summarize content, and answer all your Questions. Ideal for
              everyone,{" "}
              <span className="text-green-600 uppercase font-semibold">
                PDFY
              </span>{" "}
              turns static documents into{" "}
              <span className="font-semibold text-[#4f46dd]">
                dynamic conversations
              </span>
              , enhancing productivity upto 10x effortlessly.
            </p>
          </div>
          {isAuth ? (
            <Button asChild className="mt-10 hover:bg-[#4f46dd]">
              <Link href="/dashboard">
                Chat with PDF <FileText className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          ) : (
            <Button asChild className="mt-10 hover:bg-[#4f46dd]">
              <Link href="/dashboard">
                Get Started <LogIn className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              alt="homepage_image"
              src="/app.png"
              width={2432}
              height={1442}
              className="mb-0 rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-x-32 bottom-0 bg-gradient-to-t from-white/95 pt-[5%]" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <div className="flex flex-col justify-center items-center mx-auto max-w-7xl px-6 lg:px-8">
            <div
              className="inline-flex py-1 px-1 pr-4 mb-8 bg-[#4f46dd] rounded-lg"
              role="alert"
            >
              <h2 className="text-base font-semibold leading-7 text-green-600 uppercase tracking-widest typewriter">
                <span className="text-sm bg-primary rounded-lg text-white px-4 py-1.5">
                  Key
                </span>{" "}
                <span className="text-sm font-semibold text-white">
                  Features
                </span>
              </h2>
            </div>
          </div>
          <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {Features.map((feature, index) => (
              <div
                key={index}
                className="relative block rounded-xl border bg-white
         border-gray-200 p-8 shadow-xl transition
         hover:border-green-600/10 hover:shadow-green-600/10 cursor-pointer"
              >
                <dt className="inline font-semibold text-gray-900">
                  <feature.icon
                    aria-hidden="true"
                    className="absolute left-2 top-9 h-5 w-5 text-green-600"
                  />
                </dt>
                <dd className="ml-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
