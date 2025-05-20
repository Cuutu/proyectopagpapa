import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No se ha proporcionado ningún archivo' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Guardar el archivo en la carpeta public
    const path = join(process.cwd(), 'public', 'catalogo.pdf');
    await writeFile(path, buffer);

    return NextResponse.json({ message: 'PDF subido exitosamente' });
  } catch (error) {
    console.error('Error al subir el PDF:', error);
    return NextResponse.json(
      { error: 'Error al subir el PDF' },
      { status: 500 }
    );
  }
} 