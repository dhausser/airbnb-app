// import { keyframes, css, Global } from '@emotion/react'
// import styled from '@emotion/styled'

// export const globalStyles = (
//   <Global
//     styles={css`
//       html,
//       body {
//         padding: 0;
//         margin: 0;
//         font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
//           Droid Sans, Helvetica Neue, sans-serif;
//       }
//       * {
//         box-sizing: border-box;
//       }
//     `}
//   />
// )

// export const Container = styled('div')`
//   min-height: 100vh;
//   padding: 0 0.5rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `

// export const Main = styled('div')`
//   padding: 5rem 0;
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `

// export const Footer = styled('div')`
//   width: 100%;
//   height: 100px;
//   border-top: 1px solid #eaeaea;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   img {
//     margin-left: 0.5rem;
//   }

//   a {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `

// export const StyledLink = styled('div')`
//   a {
//     color: inherit;
//     text-decoration: none;
//   }
// `

// export const Title = styled('div')`
//   margin: 0;
//   line-height: 1.15;
//   font-size: 4rem;
//   text-align: center;

//   a {
//     color: #0070f3;
//     text-decoration: none;
//   }

//   a:hover,
//   a:focus,
//   a:active {
//     text-decoration: underline;
//   }
// `

// export const Description = styled('div')`
//   line-height: 1.5;
//   font-size: 1.5rem;
// `

// export const Code = styled('div')`
//   background: #fafafa;
//   border-radius: 5px;
//   padding: 0.75rem;
//   font-size: 1.1rem;
//   font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono,
//     Courier New, monospace;
// `

// export const Grid = styled('div')`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;

//   max-width: 800px;
//   margin-top: 3rem;

//   @media (max-width: 600px) {
//     width: 100%;
//     flex-direction: column;
//   }
// `

// export const Card = styled('div')`
//   cursor: pointer;
//   margin: 1rem;
//   flex-basis: 45%;
//   padding: 1.5rem;
//   text-align: left;
//   color: inherit;
//   text-decoration: none;
//   border: 1px solid #eaeaea;
//   border-radius: 10px;
//   transition: color 0.15s ease, border-color 0.15s ease;

//   .hover,
//   .focus,
//   .active {
//     color: #0070f3;
//     border-color: #0070f3;
//   }

//   h3 {
//     margin: 0 0 1rem 0;
//     font-size: 1.5rem;
//   }

//   p {
//     margin: 0;
//     font-size: 1.25rem;
//     line-height: 1.5;
//   }
// `

// export const Logo = styled('div')`
//   height: 1em;
// `

// export const basicStyles = css`
//   background-color: white;
//   color: cornflowerblue;
//   border: 1px solid lightgreen;
//   border-right: none;
//   border-bottom: none;
//   box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
//   transition: all 0.1s linear;
//   margin: 3rem 0;
//   padding: 1rem 0.5rem;
// `

// export const hoverStyles = css`
//   &:hover {
//     color: white;
//     background-color: lightgray;
//     border-color: aqua;
//     box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
//   }
// `
// export const bounce = keyframes`
//   from {
//     transform: scale(1.01);
//   }
//   to {
//     transform: scale(0.99);
//   }
// `

// export const Basic = styled('div')`
//   ${basicStyles};
// `

// export const Combined = styled('div')`
//   ${basicStyles};
//   ${hoverStyles};
//   & code {
//     background-color: linen;
//   }
// `
// export const Animated = styled('div')`
//   ${basicStyles};
//   ${hoverStyles};
//   & code {
//     background-color: linen;
//   }
//   animation: ${(props) => props.animation} 0.2s infinite ease-in-out alternate;
// `
