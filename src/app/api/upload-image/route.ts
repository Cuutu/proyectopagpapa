import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No se ha proporcionado ningún archivo' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear carpeta images si no existe
    const imagesDir = join(process.cwd(), 'public', 'images');
    await mkdir(imagesDir, { recursive: true });

    // Nombre único para la imagen
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = join(imagesDir, fileName);
    await writeFile(filePath, buffer);

    // URL pública
    const imageUrl = `/images/${fileName}`;
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 });
  }
} 