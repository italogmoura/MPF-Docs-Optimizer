#!/usr/bin/env python3
"""
Script alternativo para criar ícones PNG usando Pillow
"""

import os
from PIL import Image, ImageDraw

def create_icon(size):
    """Cria um ícone PNG no tamanho especificado"""
    # Cria imagem com fundo transparente
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Calcula proporções baseadas no tamanho
    padding = int(size * 0.125)  # 16px em 128px
    icon_size = size - (padding * 2)
    
    # Cores
    blue_primary = (30, 136, 229)  # #1E88E5
    blue_dark = (21, 101, 192)     # #1565C0
    white = (255, 255, 255)
    gray_light = (224, 224, 224)   # #E0E0E0
    
    # Posições do documento
    doc_x = padding + int(icon_size * 0.125)
    doc_y = padding + int(icon_size * 0.083)
    doc_width = int(icon_size * 0.75)
    doc_height = int(icon_size * 0.833)
    
    # Desenha documento com sombra
    shadow_offset = max(1, size // 64)
    draw.rounded_rectangle(
        [doc_x + shadow_offset, doc_y + shadow_offset, 
         doc_x + doc_width + shadow_offset, doc_y + doc_height + shadow_offset],
        radius=max(2, size // 32),
        fill=(0, 0, 0, 30)
    )
    
    # Desenha documento
    draw.rounded_rectangle(
        [doc_x, doc_y, doc_x + doc_width, doc_y + doc_height],
        radius=max(2, size // 32),
        fill=white
    )
    
    # Desenha barra superior (MPF bar)
    bar_height = int(icon_size * 0.125)
    draw.rounded_rectangle(
        [doc_x, doc_y, doc_x + doc_width, doc_y + bar_height],
        radius=max(2, size // 32),
        fill=blue_primary
    )
    
    # Desenha setas de expansão
    arrow_size = max(6, size // 8)
    arrow_width = max(1, size // 64)
    
    # Função auxiliar para desenhar seta
    def draw_expand_arrow(x, y, direction):
        if direction == 'tl':  # top-left
            draw.line([(x, y+arrow_size), (x, y), (x+arrow_size, y)], 
                     fill=blue_primary, width=arrow_width)
            draw.line([(x, y), (x+arrow_size//2, y+arrow_size//2)], 
                     fill=blue_primary, width=arrow_width)
        elif direction == 'tr':  # top-right
            draw.line([(x, y+arrow_size), (x, y), (x-arrow_size, y)], 
                     fill=blue_primary, width=arrow_width)
            draw.line([(x, y), (x-arrow_size//2, y+arrow_size//2)], 
                     fill=blue_primary, width=arrow_width)
        elif direction == 'bl':  # bottom-left
            draw.line([(x, y-arrow_size), (x, y), (x+arrow_size, y)], 
                     fill=blue_primary, width=arrow_width)
            draw.line([(x, y), (x+arrow_size//2, y-arrow_size//2)], 
                     fill=blue_primary, width=arrow_width)
        elif direction == 'br':  # bottom-right
            draw.line([(x, y-arrow_size), (x, y), (x-arrow_size, y)], 
                     fill=blue_primary, width=arrow_width)
            draw.line([(x, y), (x-arrow_size//2, y-arrow_size//2)], 
                     fill=blue_primary, width=arrow_width)
    
    # Desenha as 4 setas
    arrow_margin = int(icon_size * 0.083)
    draw_expand_arrow(doc_x + arrow_margin, doc_y + bar_height + arrow_margin, 'tl')
    draw_expand_arrow(doc_x + doc_width - arrow_margin, doc_y + bar_height + arrow_margin, 'tr')
    draw_expand_arrow(doc_x + arrow_margin, doc_y + doc_height - arrow_margin, 'bl')
    draw_expand_arrow(doc_x + doc_width - arrow_margin, doc_y + doc_height - arrow_margin, 'br')
    
    # Desenha linhas de texto
    text_x = doc_x + int(icon_size * 0.125)
    text_start_y = doc_y + bar_height + int(icon_size * 0.25)
    line_height = int(icon_size * 0.083)
    line_thickness = max(2, size // 42)
    
    # Larguras variadas para as linhas
    line_widths = [0.5, 0.375, 0.437, 0.312]
    
    for i, width_factor in enumerate(line_widths):
        y = text_start_y + (i * line_height)
        if y + line_thickness < doc_y + doc_height - arrow_margin:
            line_width = int(doc_width * width_factor)
            draw.rounded_rectangle(
                [text_x, y, text_x + line_width, y + line_thickness],
                radius=line_thickness // 2,
                fill=gray_light
            )
    
    # Adiciona pequeno círculo representando logo MPF
    if size >= 48:
        circle_radius = max(2, size // 42)
        circle_x = doc_x + doc_width // 2
        circle_y = doc_y + bar_height // 2
        draw.ellipse(
            [circle_x - circle_radius, circle_y - circle_radius,
             circle_x + circle_radius, circle_y + circle_radius],
            fill=white
        )
    
    return img

def main():
    # Cria diretório icons se não existir
    if not os.path.exists('icons'):
        os.makedirs('icons')
    
    # Tamanhos necessários para extensão Chrome
    sizes = [16, 32, 48, 128]
    
    for size in sizes:
        img = create_icon(size)
        output_file = f'icons/icon-{size}.png'
        img.save(output_file, 'PNG')
        print(f"✓ Criado: {output_file} ({size}x{size})")
    
    print("\n✅ Todos os ícones foram criados com sucesso!")
    print("\nPróximos passos:")
    print("1. Verifique os ícones na pasta 'icons/'")
    print("2. O manifest.json já está configurado para usar estes ícones")

if __name__ == "__main__":
    main()