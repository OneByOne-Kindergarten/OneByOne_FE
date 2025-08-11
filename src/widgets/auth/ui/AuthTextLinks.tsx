import { Link } from "react-router-dom";

import { URL_PATHS } from "@/shared/constants/url-path";

interface AuthTextLinksProps {
  types: ("로그인" | "회원가입" | "비밀번호 찾기")[];
}

const authLinks = {
  로그인: {
    description: "이미 회원이신가요?",
    to: URL_PATHS.SIGNIN,
  },
  회원가입: {
    description: "아직 회원이 아니신가요?",
    to: URL_PATHS.SIGNUP,
  },
  "비밀번호 찾기": {
    description: "비밀번호를 잊으셨나요?",
    to: URL_PATHS.FIND_PASSWORD,
  },
};

export default function AuthTextLinks({ types }: AuthTextLinksProps) {
  return (
    <section className="flex flex-col items-center gap-2">
      {types.map((type) => (
        <div key={type} className="flex justify-center gap-2 text-xs">
          <p className="text-primary-dark03">{authLinks[type].description}</p>
          <Link
            to={authLinks[type].to}
            className="font-semibold text-tertiary-3 active:opacity-70"
          >
            {type}
          </Link>
        </div>
      ))}
    </section>
  );
}
