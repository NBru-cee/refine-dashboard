import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";

import { Box, Container } from "@mui/material";
import { yariga } from "../assets";
import { CredentialResponse } from "../interfaces/google";

export const Login: React.FC = () => {
     const { mutate: login } = useLogin<CredentialResponse>();

     const GoogleButton = (): JSX.Element => {
          const divRef = useRef<HTMLDivElement>(null);

          useEffect(() => {
               if (
                    typeof window === "undefined" ||
                    !window.google ||
                    !divRef.current
               ) {
                    return;
               }

               try {
                    window.google.accounts.id.initialize({
                         ux_mode: "popup",
                         client_id:
                              "881725533619-tkds2eu5p697ri4217c3e90okl17u180.apps.googleusercontent.com",
                         callback: async (res: CredentialResponse) => {
                              if (res.credential) {
                                   login(res);
                              }
                         },
                    });
                    window.google.accounts.id.renderButton(divRef.current, {
                         theme: "filled_blue",
                         size: "medium",
                         type: "standard",
                    });
               } catch (error) {
                    console.log(error);
               }
          }, []);

          return <div ref={divRef} />;
     };

     return (
          <Box
               sx={{
                    backgroundColor: "#fcfcfc",
               }}
          >
               <Container
                    component="main"
                    maxWidth="xs"
                    sx={{
                         display: "flex",
                         flexDirection: "column",
                         justifyContent: "center",
                         height: "100vh",
                    }}
               >
                    <Box
                         display="flex"
                         justifyContent="center"
                         flexDirection="column"
                         alignItems="center"
                    >
                         <div>
                              <img src={yariga} alt="yariga logo" />
                         </div>
                    </Box>
                    <Box>
                         <GoogleButton />
                    </Box>
               </Container>
          </Box>
     );
};
