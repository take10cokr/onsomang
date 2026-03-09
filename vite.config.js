import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html'),
                add_member: resolve(__dirname, 'add_member.html'),
                edit_member: resolve(__dirname, 'edit_member.html'),
                detail: resolve(__dirname, 'detail.html'),
                prayer_note: resolve(__dirname, 'prayer_note.html'),
                not_found: resolve(__dirname, '404.html')
            }
        }
    }
});
