"use client";

import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Gravatar from "react-gravatar";

import { LogOut, Name, UserCard, gravatarStyle } from "./LoggedUser.style";
import { useFirebaseAuth } from "@/contexts";
import { requestLogout } from "@/fbase";

export default function LoggedUser() {
    const { user, isLogged } = useFirebaseAuth();

    if (!isLogged || !user) return null;

    return (
        <Paper elevation={2} component="aside" aria-label="user card">
            <UserCard>
                <Box>
                    {user.email && <Gravatar email={user.email} size={40} style={gravatarStyle} />}
                    <CardContent>
                        <Name>{user.displayName || user.email}</Name>
                        <LogOut variant="contained" onClick={() => requestLogout()}>
                            LogOut
                        </LogOut>
                    </CardContent>
                </Box>
            </UserCard>
        </Paper>
    );
}
