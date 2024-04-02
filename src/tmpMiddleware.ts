// import { NextRequest, NextResponse } from "next/server";

// const sessionOut = ['/login', '/signup'];
// const sessionIn = ['/movieform'];

// export default function middleware(req: NextRequest){
//   const { pathname, origin } = req.nextUrl;
//   const isLogged = JSON.parse(localStorage.getItem("token") ?? '').state.isLogged;

//   const notAllowedIn = sessionIn.includes(pathname) && !isLogged;
//   const notAllowedOut = sessionOut.includes(pathname) && isLogged;

//   if (notAllowedIn || notAllowedOut) {
//     const absoluteUrl = new URL('/', origin);
//     return NextResponse.redirect(absoluteUrl.toString());
//   }
// }