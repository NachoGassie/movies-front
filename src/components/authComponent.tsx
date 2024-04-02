import { sessionInUrl, sessionOutUrl } from '@/constants';
import { redirect, usePathname } from "next/navigation";

type ComponentFn = () => JSX.Element;

const withAuth = <T extends Record<string, any>>(Component: ComponentFn) => (
  (props: T) => {
    const pathname = usePathname();

    const isLogged = JSON.parse(localStorage.getItem("token") ?? '').state.isLogged;

    const notAllowedIn = sessionInUrl.includes(pathname) && !isLogged;
    const notAllowedOut = sessionOutUrl.includes(pathname) && isLogged;

    if (notAllowedIn || notAllowedOut) redirect('/');
    
    return <Component {...props}/>
  }
)

export default withAuth;
