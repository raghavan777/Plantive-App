import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

const BACK_ACTIONS = new Set(["GO_BACK", "POP", "POP_TO_TOP"]);

export default function useRoleBackPolicy({ navigation, homeRoute, isHome = false, onHomeBack }) {
    useFocusEffect(
        useCallback(() => {
            const handleBack = () => {
                if (isHome) {
                    if (onHomeBack) onHomeBack();
                    return true;
                }

                navigation.navigate(homeRoute);
                return true;
            };

            const hardwareSub = BackHandler.addEventListener("hardwareBackPress", handleBack);
            const navSub = navigation.addListener("beforeRemove", (e) => {
                const actionType = e?.data?.action?.type;
                if (!BACK_ACTIONS.has(actionType)) return;
                e.preventDefault();
                handleBack();
            });

            return () => {
                hardwareSub.remove();
                navSub();
            };
        }, [homeRoute, isHome, navigation, onHomeBack])
    );
}
