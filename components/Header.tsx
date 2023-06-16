"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import AddButton from "./AddButton";
import { AiOutlinePlus } from "react-icons/ai";
import useAddExpModal from "@/hooks/useAddExpModal";
import useReminderModal from "@/hooks/useAddReminderModal";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  hide?: boolean;
  loc?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className, hide, loc }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const addExpModal = useAddExpModal();
  const addReminderModal = useReminderModal();

  const [greet, setGreet] = useState("");
  var date = new Date();
  var current_time = date.getHours();
  useEffect(() => {
    if (current_time < 12) {
      setGreet("Good Morning");
    } else if (current_time < 18) {
      setGreet("Good Afternoon");
    } else {
      setGreet("Good Evening");
    }
  }, [current_time]);

  const supabaseClient = useSupabaseClient();

  const { user } = useUser();

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-slate-600 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          {!hide && (
            <>
              <button
                onClick={() => router.back()}
                className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
              >
                <RxCaretLeft size={35} className="text-white" />
              </button>
              <button
                onClick={() => router.forward()}
                className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
              >
                <RxCaretRight size={35} className="text-white" />
              </button>
            </>
          )}
        </div>
        {hide ? (
          <></>
        ) : (
          <>
            <div className="flex md:hidden gap-x-2 items-center">
              <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                <Link href="/">
                  <HiHome className="text-black" size={20} />
                </Link>
              </button>
              <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                <Link href="/profile">
                  <FaUserCircle className="text-black" size={20} />
                </Link>
              </button>
            </div>
          </>
        )}

        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div>
              <h1 className="flex md:hidden font-bold text-2xl">
                Money Matters
              </h1>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {loc === "home" ? (
        <div className="flex gap-2 pt-4">
          <h1 className="font-semibold text-2xl lg:text-3xl">
            Add Expense
          </h1>
          <AddButton onClick={user ? addExpModal.onOpen: authModal.onOpen}>
            <AiOutlinePlus />
          </AddButton>
        </div>
      ) : loc === "allExp" ? (
        <div className="flex gap-2 pt-4">
          <h1 className="font-semibold text-2xl lg:text-3xl">
            All Expenses
          </h1>
          <AddButton onClick={user ? addExpModal.onOpen : authModal.onOpen}>
            <AiOutlinePlus />
          </AddButton>
        </div>
      ) : loc === 'reminders' ? (
        <div className="flex gap-2 pt-4">
          <h1 className="font-semibold text-2xl lg:text-3xl">
            Reminder
          </h1>
          <AddButton onClick={user ? addReminderModal.onOpen: authModal.onOpen}>
            <AiOutlinePlus />
          </AddButton>
        </div>
      ) : (
        <div className="flex gap-2 pt-4">
          <h1 className="font-semibold text-2xl lg:text-3xl">
            {greet}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Header;
