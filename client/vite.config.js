<<<<<<< HEAD
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
>>>>>>> 55f3451ad7cc244e44fab9df03b233032a2d55aa

export default defineConfig({
<<<<<<< HEAD
  plugins: [
    tailwindcss()
  ],
});
=======
  plugins: [react(), tailwindcss()],
})
>>>>>>> 55f3451ad7cc244e44fab9df03b233032a2d55aa
