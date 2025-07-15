#!/usr/bin/env python3
"""
Script para processar capturas de tela para Chrome Web Store
Ajusta dimensões para 1280x800 e remove canal alfa
"""

import os
from PIL import Image
import glob

def process_screenshot(input_path, output_path):
    """Processa uma captura de tela para os requisitos da Chrome Web Store"""
    
    # Abre a imagem
    img = Image.open(input_path)
    
    # Mostra dimensões originais
    print(f"\nProcessando: {os.path.basename(input_path)}")
    print(f"  Dimensões originais: {img.size}")
    print(f"  Modo: {img.mode}")
    
    # Remove canal alfa (transparência) se existir
    if img.mode in ('RGBA', 'LA'):
        # Cria fundo branco
        background = Image.new('RGB', img.size, (255, 255, 255))
        # Converte para RGB mantendo a transparência como branco
        if img.mode == 'RGBA':
            background.paste(img, mask=img.split()[3])
        else:
            background.paste(img, mask=img.split()[1])
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Calcula proporções para redimensionamento
    target_width = 1280
    target_height = 800
    
    # Obtém dimensões atuais
    width, height = img.size
    
    # Calcula a escala mantendo proporção
    scale_x = target_width / width
    scale_y = target_height / height
    
    # Usa a menor escala para caber completamente
    scale = min(scale_x, scale_y)
    
    # Calcula novas dimensões
    new_width = int(width * scale)
    new_height = int(height * scale)
    
    # Redimensiona a imagem
    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Cria imagem final 1280x800 com fundo branco
    final_img = Image.new('RGB', (target_width, target_height), (255, 255, 255))
    
    # Calcula posição para centralizar
    x_offset = (target_width - new_width) // 2
    y_offset = (target_height - new_height) // 2
    
    # Cola a imagem redimensionada no centro
    final_img.paste(img, (x_offset, y_offset))
    
    # Salva a imagem processada
    final_img.save(output_path, 'PNG', quality=95, optimize=True)
    
    print(f"  ✓ Salva como: {os.path.basename(output_path)}")
    print(f"  Dimensões finais: 1280x800")

def main():
    # Diretório das capturas
    input_dir = "chrome-web-store/capturasTela"
    
    # Lista arquivos PNG
    screenshots = glob.glob(os.path.join(input_dir, "*.png"))
    
    if not screenshots:
        print("Nenhuma captura de tela encontrada!")
        return
    
    print(f"Encontradas {len(screenshots)} capturas de tela")
    
    # Processa cada captura
    for i, screenshot in enumerate(sorted(screenshots), 1):
        output_name = f"screenshot-{i}.png"
        output_path = os.path.join(input_dir, output_name)
        
        # Evita sobrescrever arquivos processados
        if "screenshot-" in os.path.basename(screenshot):
            continue
            
        process_screenshot(screenshot, output_path)
    
    print("\n✅ Todas as capturas foram processadas!")
    print("\nArquivos prontos para upload:")
    for i in range(1, len(screenshots) + 1):
        print(f"  - screenshot-{i}.png (1280x800, RGB)")

if __name__ == "__main__":
    main()