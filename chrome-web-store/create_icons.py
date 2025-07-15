#!/usr/bin/env python3
"""
Script para criar ícones PNG da extensão Chrome a partir do SVG
Requer: pip install cairosvg pillow
"""

import os
import cairosvg
from PIL import Image
import io

def create_icon(svg_path, size, output_path):
    """Cria um ícone PNG no tamanho especificado"""
    # Converte SVG para PNG
    png_data = cairosvg.svg2png(
        url=svg_path, 
        output_width=size, 
        output_height=size
    )
    
    # Salva o PNG
    with open(output_path, 'wb') as f:
        f.write(png_data)
    
    print(f"✓ Criado: {output_path} ({size}x{size})")

def main():
    # Cria diretório icons se não existir
    if not os.path.exists('icons'):
        os.makedirs('icons')
    
    svg_file = 'icon-design.svg'
    
    # Tamanhos necessários para extensão Chrome
    sizes = [16, 32, 48, 128]
    
    for size in sizes:
        output_file = f'icons/icon-{size}.png'
        create_icon(svg_file, size, output_file)
    
    print("\n✅ Todos os ícones foram criados com sucesso!")
    print("\nPróximos passos:")
    print("1. Verifique os ícones na pasta 'icons/'")
    print("2. Atualize o manifest.json para referenciar os novos ícones")

if __name__ == "__main__":
    main()