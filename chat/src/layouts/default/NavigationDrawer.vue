<template>
    <v-navigation-drawer v-model="store.drawer">
    <v-sheet
        color="grey-lighten-4"
        class="pa-4"
    >
        <v-avatar
        class="mb-4"
        color="grey-darken-1"
        size="64"
        ></v-avatar>

        <div>john@google.com</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
        <v-list-item
        v-for="[icon, text, link] in links"
        :key="icon"
        link
        :to="link"
        >
            <template v-slot:prepend>
                <v-icon>{{ icon }}</v-icon>
            </template>
        <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/app'

const store = useAppStore()

const links= [
        ['mdi-home', 'Home', 'home'],
        ['mdi-account', 'User', 'user'],
        ['mdi-delete', 'Trash', ''],
        ['mdi-alert-octagon', 'Spam', ''],
    ]
</script>