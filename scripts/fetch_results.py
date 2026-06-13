"""
Descarga resultados del Mundial 2026 desde football-data.org
y actualiza results.json en el repo.

Corre como GitHub Action con el secret FD_TOKEN.
Solo toca las claves m01-m72 (fase de grupos); los resultados
de fases eliminatorias (r01+) se preservan si existen.
"""

import os, json, sys, urllib.request, urllib.error
from datetime import datetime, timezone, timedelta

FD_TOKEN = os.environ.get('FD_TOKEN', '')
if not FD_TOKEN:
    print('[ERROR] Variable FD_TOKEN no definida.')
    sys.exit(1)

FD_URL = 'https://api.football-data.org/v4/competitions/WC/matches'
COT_OFFSET = timedelta(hours=-5)

# TLA football-data.org → código interno
TLA_MAP = {
    'MEX':'MEX', 'RSA':'RSA', 'SAF':'RSA', 'KOR':'KOR', 'CZE':'CZE',
    'CAN':'CAN', 'BIH':'BIH', 'QAT':'QAT', 'SUI':'SUI',
    'USA':'USA', 'PAR':'PAR', 'AUS':'AUS', 'TUR':'TUR',
    'GER':'GER', 'CUW':'CUW', 'NED':'NED', 'JPN':'JPN',
    'CIV':'CIV', 'ECU':'ECU', 'SWE':'SWE', 'TUN':'TUN',
    'ESP':'ESP', 'CPV':'CPV', 'CAP':'CPV', 'BEL':'BEL', 'EGY':'EGY',
    'KSA':'KSA', 'SAU':'KSA', 'URU':'URU', 'IRN':'IRN', 'NZL':'NZL',
    'FRA':'FRA', 'SEN':'SEN', 'IRQ':'IRQ', 'IRA':'IRQ', 'NOR':'NOR',
    'ARG':'ARG', 'ALG':'ALG', 'AUT':'AUT', 'JOR':'JOR',
    'POR':'POR', 'COD':'COD', 'DRC':'COD', 'ENG':'ENG', 'CRO':'CRO',
    'GHA':'GHA', 'PAN':'PAN', 'UZB':'UZB', 'COL':'COL',
    'BRA':'BRA', 'MAR':'MAR', 'HAI':'HAI', 'HTI':'HAI', 'SCO':'SCO',
}

# (date_COT, homeTLA, awayTLA) → matchId
# Permite cruzar los partidos de la API con nuestros IDs
SCHEDULE = {
    ('2026-06-11','MEX','RSA'):'m01', ('2026-06-11','KOR','CZE'):'m02',
    ('2026-06-12','CAN','BIH'):'m03', ('2026-06-12','USA','PAR'):'m04',
    ('2026-06-13','QAT','SUI'):'m05', ('2026-06-13','BRA','MAR'):'m06',
    ('2026-06-13','HAI','SCO'):'m07', ('2026-06-13','AUS','TUR'):'m08',
    ('2026-06-14','GER','CUW'):'m09', ('2026-06-14','NED','JPN'):'m10',
    ('2026-06-14','CIV','ECU'):'m11', ('2026-06-14','SWE','TUN'):'m12',
    ('2026-06-15','ESP','CPV'):'m13', ('2026-06-15','BEL','EGY'):'m14',
    ('2026-06-15','KSA','URU'):'m15', ('2026-06-15','IRN','NZL'):'m16',
    ('2026-06-16','FRA','SEN'):'m17', ('2026-06-16','IRQ','NOR'):'m18',
    ('2026-06-16','ARG','ALG'):'m19', ('2026-06-16','AUT','JOR'):'m20',
    ('2026-06-17','POR','COD'):'m21', ('2026-06-17','ENG','CRO'):'m22',
    ('2026-06-17','GHA','PAN'):'m23', ('2026-06-17','UZB','COL'):'m24',
    ('2026-06-18','CZE','RSA'):'m25', ('2026-06-18','SUI','BIH'):'m26',
    ('2026-06-18','CAN','QAT'):'m27', ('2026-06-18','MEX','KOR'):'m28',
    ('2026-06-19','USA','AUS'):'m29', ('2026-06-19','SCO','MAR'):'m30',
    ('2026-06-19','BRA','HAI'):'m31', ('2026-06-19','TUR','PAR'):'m32',
    ('2026-06-20','NED','SWE'):'m33', ('2026-06-20','GER','CIV'):'m34',
    ('2026-06-20','ECU','CUW'):'m35', ('2026-06-20','TUN','JPN'):'m36',
    ('2026-06-21','ESP','KSA'):'m37', ('2026-06-21','BEL','IRN'):'m38',
    ('2026-06-21','URU','CPV'):'m39', ('2026-06-21','NZL','EGY'):'m40',
    ('2026-06-22','ARG','AUT'):'m41', ('2026-06-22','FRA','IRQ'):'m42',
    ('2026-06-22','NOR','SEN'):'m43', ('2026-06-22','JOR','ALG'):'m44',
    ('2026-06-23','POR','UZB'):'m45', ('2026-06-23','ENG','GHA'):'m46',
    ('2026-06-23','PAN','CRO'):'m47', ('2026-06-23','COL','COD'):'m48',
    ('2026-06-24','SUI','CAN'):'m49', ('2026-06-24','BIH','QAT'):'m50',
    ('2026-06-24','SCO','BRA'):'m51', ('2026-06-24','MAR','HAI'):'m52',
    ('2026-06-24','CZE','MEX'):'m53', ('2026-06-24','RSA','KOR'):'m54',
    ('2026-06-25','CUW','CIV'):'m55', ('2026-06-25','ECU','GER'):'m56',
    ('2026-06-25','JPN','SWE'):'m57', ('2026-06-25','TUN','NED'):'m58',
    ('2026-06-25','TUR','USA'):'m59', ('2026-06-25','PAR','AUS'):'m60',
    ('2026-06-26','NOR','FRA'):'m61', ('2026-06-26','SEN','IRQ'):'m62',
    ('2026-06-26','CPV','KSA'):'m63', ('2026-06-26','URU','ESP'):'m64',
    ('2026-06-26','EGY','IRN'):'m65', ('2026-06-26','NZL','BEL'):'m66',
    ('2026-06-27','PAN','ENG'):'m67', ('2026-06-27','CRO','GHA'):'m68',
    ('2026-06-27','COL','POR'):'m69', ('2026-06-27','COD','UZB'):'m70',
    ('2026-06-27','ALG','AUT'):'m71', ('2026-06-27','JOR','ARG'):'m72',
}


def fetch_api():
    req = urllib.request.Request(FD_URL, headers={'X-Auth-Token': FD_TOKEN})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            remaining = resp.headers.get('X-Requests-Available-Minute')
            if remaining and int(remaining) < 2:
                print(f'[WARN] Rate limit casi agotado: {remaining} req restantes este minuto')
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f'[ERROR] HTTP {e.code}: {e.reason}')
        if e.code == 404:
            print('[INFO] Competición WC no encontrada en la API (puede no estar disponible aún)')
        sys.exit(0)  # salida limpia: no borrar results.json
    except urllib.error.URLError as e:
        print(f'[ERROR] Conexión fallida: {e.reason}')
        sys.exit(0)


def map_results(api_matches):
    mapped = {}
    skipped = []
    for m in api_matches:
        status = m.get('status', '')
        if status not in ('FINISHED', 'IN_PLAY', 'PAUSED'):
            continue
        score = (m.get('score') or {}).get('fullTime') or {}
        gh, ga = score.get('home'), score.get('away')
        if gh is None or ga is None:
            continue

        home_tla = TLA_MAP.get((m.get('homeTeam') or {}).get('tla', ''))
        away_tla = TLA_MAP.get((m.get('awayTeam') or {}).get('tla', ''))
        if not home_tla or not away_tla:
            skipped.append(f"{m.get('homeTeam',{}).get('tla')} vs {m.get('awayTeam',{}).get('tla')}")
            continue

        # Convertir utcDate → fecha COT
        utc_dt = datetime.fromisoformat(m['utcDate'].replace('Z', '+00:00'))
        cot_dt = utc_dt.astimezone(timezone(COT_OFFSET))
        cot_date = cot_dt.strftime('%Y-%m-%d')

        match_id = SCHEDULE.get((cot_date, home_tla, away_tla))
        if match_id:
            entry = {'home': gh, 'away': ga}
            if status == 'IN_PLAY' or status == 'PAUSED':
                entry['live'] = True
            mapped[match_id] = entry
        else:
            skipped.append(f'{cot_date} {home_tla}-{away_tla}')

    if skipped:
        print(f'[WARN] No mapeados: {skipped}')
    return mapped


def main():
    print('[INFO] Consultando football-data.org...')
    data = fetch_api()
    matches = data.get('matches', [])
    print(f'[INFO] Partidos recibidos de la API: {len(matches)}')

    new_results = map_results(matches)
    print(f'[INFO] Partidos con resultado: {len(new_results)}')

    # Leer results.json existente (preservar fases eliminatorias r01+)
    results_path = os.path.join(os.path.dirname(__file__), '..', 'results.json')
    try:
        with open(results_path, 'r', encoding='utf-8') as f:
            existing = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing = {}

    # Combinar: API actualiza grupos (m*), preservar eliminatorias (r*)
    knockout_data = {k: v for k, v in existing.items() if k.startswith('r')}
    merged = {**knockout_data, **new_results}

    # Añadir timestamp de última actualización
    merged['_updated'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

    with open(results_path, 'w', encoding='utf-8') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f'[OK] results.json actualizado con {len(new_results)} resultados.')


if __name__ == '__main__':
    main()
