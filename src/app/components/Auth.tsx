// 파이어베이스
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
// 리코일
import { atom, useSetRecoilState } from 'recoil';
// 넥스트
import { usePathname, useRouter } from 'next/navigation';

// 리코일 아톰: 사용자 데이터를 저장함
export const userState = atom<User | null>({
    key: 'userState',
    default: null,
    dangerouslyAllowMutability: true,
});

// 로그인 상태관리 컴포넌트
export default function Auth(): null {
    const auth = getAuth();
    const router = useRouter();
    const pathname = usePathname();
    const setUserState = useSetRecoilState(userState);

    // 로그인 여부 검사
    onAuthStateChanged(auth, (user: User | null) => {
        if (user === null && !pathname.startsWith('/sign/')) {
            // 로그인 되어있지 않으면, 로그인 창으로 보내버림
            router.replace(`/sign/in`);
        } else {
            // 로그인 되어있음
            setUserState(user);
            // 민감한 정보는 https 쿠키에 저장하자!
            // expires = 만료 시간
            // path = 다른 곳으로 전송 안 되게 함
            // document.cookie = "expires=Thu, 1 Jan 2023 12:00:00 UTC; path=/; secure; HttpOnly";
        }
    })

    return (null);
}