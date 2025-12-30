import os
import pandas as pd
from PIL import Image, ImageDraw, ImageFont

# ---------- CONFIGURACIÓ ----------
CSV_PATH = "dades_amb_id_cantants_majuscules.xlsx"
OUTPUT_DIR = "targetes_img"
IMG_SIZE = 800
BACKGROUND_COLOR = (245, 245, 245)
TEXT_COLOR = (20, 20, 20)

# Mides de font
FONT_CANTANT_SIZE = 40
FONT_ANY_SIZE = 180
FONT_TITOL_SIZE = 60


# ---------- CARREGAR FONTS ----------
FONT_BOLD = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
FONT_REGULAR = '/System/Library/Fonts/Supplemental/Georgia.ttf'

font_cantant = ImageFont.truetype(FONT_BOLD, FONT_CANTANT_SIZE)
font_any = ImageFont.truetype(FONT_BOLD, FONT_ANY_SIZE)
font_titol = ImageFont.truetype(FONT_REGULAR, FONT_TITOL_SIZE)



# ---------- CREAR CARPETA SORTIDA ----------
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------- LLEGIR CSV ----------
df = pd.read_excel(CSV_PATH)

# ---------- FUNCIÓ PER TEXT CENTRAT ----------
def draw_centered_text(draw, text, font, y):
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    x = (IMG_SIZE - text_width) // 2
    draw.text((x, y), text, fill=TEXT_COLOR, font=font)

# ---------- CREAR TARGETES ----------
for idx, row in df.iterrows():
    titol = str(row["titol"])
    any_publicacio = str(row["any"])
    cantant = str(row["cantant"])

    img = Image.new("RGB", (IMG_SIZE, IMG_SIZE), BACKGROUND_COLOR)
    draw = ImageDraw.Draw(img)

    # Posicions verticals
    y_cantant = 100
    y_any = IMG_SIZE // 2 - 80
    y_titol = IMG_SIZE - 160

    # Textos (SENSE línies)
    draw_centered_text(draw, cantant, font_cantant, y_cantant)
    draw_centered_text(draw, any_publicacio, font_any, y_any)
    draw_centered_text(draw, titol, font_titol, y_titol)

    filename = f"{idx:03d}_{titol.replace(' ', '_')}.png"
    img.save(os.path.join(OUTPUT_DIR, filename))

print("✅ Targetes creades sense línies i amb estils correctes")
