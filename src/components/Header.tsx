import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
import Image from "next/image";

function Header() {
  return (
    <div className="flex justify-between bg-white shadow-sm p-5 border-b">
      <Link href={"/"} className="text-2xl">
        <Image src={"/logo.svg"} alt="logo" width={150} height={50} />
      </Link>
      <SignedIn>
        <div className="flex items-center space-x-2">
          <Button
            asChild
            className="hidden md:flex hover:bg-white hover:border-2 hover:border-green-600 hover:text-green-600"
          >
            <Link href={"/dashboard/upgrade"}>Pricing</Link>
          </Button>
          <Button
            asChild
            className="text-white hover:bg-white hover:border-2 hover:border-green-600 hover:text-green-600"
          >
            <Link href={"/dashboard"}>My Documents</Link>
          </Button>
          <Button asChild className="text-white hover:bg-white hover:border-2 hover:border-green-600 hover:text-green-600">
            <Link href={"/dashboard/upload"}>
              Upload
              <FilePlus2 className="ml-2" />
            </Link>
          </Button>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}

export default Header;
