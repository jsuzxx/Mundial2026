"""
Descarga resultados del Mundial 2026 desde football-data.org y actualiza results.json.
Corre como GitHub Action con el secret FD_TOKEN.
"""

import os, json, sys, urllib.request, urllib.error
from datetime import datetime, timezone, timedelta

FD_TOKEN = os.environ.get('FD_TOKEN', '')
if not FD_TOKEN:
    print('[ERROR] Variable FD_TOKEN no definida. Agrega el Secret FD_TOKEN en GitHub.')
    sys.exit(1)

FD_BASE  = 'https://api.football-data.org/v4'
COT_TZ   = timezone(timedelta(hours=-5))

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


def api_get(path):
    url = FD_BASE + path
    req = urllib.request.Request(url, headers={'X-Auth-Token': FD_TOKEN})
    with urllib.request.urlopen(req, timeout=15) as resp:
        remaining = resp.headers.get('X-Requests-Available-Minute')
        if remaining and int(remaining) < 3:
            print(f'[WARN] Rate limit: solo {remaining} req disponibles este minuto')
        return json.loads(resp.read())


def find_wc_code():
    """Busca el código de la Copa del Mundo entre las competiciones disponibles."""
    print('[INFO] Listando competiciones disponibles...')
    try:
        data = api_get('/competitions')
        competitions = data.get('competitions', [])
        print(f'[INFO] Competiciones disponibles ({len(competitions)}):')
        for c in competitions:
            print(f'       {c.get("code","?"):10} | {c.get("name","?")}')

        # Buscar por código exacto primero, luego por nombre
        for c in competitions:
            if c.get('code') == 'WC':
                print(f'[OK] Encontrada: WC — {c.get("name")}')
                return 'WC'
        for c in competitions:
            name = c.get('name', '').lower()
            if 'world cup' in name or 'mundial' in name or 'fifa' in name:
                code = c.get('code')
                print(f'[OK] Encontrada por nombre: {code} — {c.get("name")}')
                return code

        print('[WARN] Copa del Mundo no encontrada en las competiciones disponibles.')
        print('[INFO] Puede que no esté incluida en tu plan gratuito.')
        print('[INFO] Verifica en https://www.football-data.org/coverage')
        return None

    except urllib.error.HTTPError as e:
        print(f'[ERROR] HTTP {e.code} al listar competiciones: {e.reason}')
        body = e.read().decode('utf-8', errors='replace')
        print(f'[ERROR] Respuesta: {body[:500]}')
        return None


def fetch_matches(comp_code):
    print(f'[INFO] Descargando partidos de la competición: {comp_code}')
    try:
        data = api_get(f'/competitions/{comp_code}/matches')
        matches = data.get('matches', [])
        print(f'[INFO] Total partidos recibidos: {len(matches)}')

        # Mostrar los primeros partidos con resultado para diagnóstico
        finished = [m for m in matches if m.get('status') in ('FINISHED', 'IN_PLAY', 'PAUSED')]
        print(f'[INFO] Partidos terminados o en juego: {len(finished)}')
        for m in finished[:5]:
            ht = (m.get('homeTeam') or {}).get('tla', '?')
            at = (m.get('awayTeam') or {}).get('tla', '?')
            sc = (m.get('score') or {}).get('fullTime') or {}
            print(f'       {ht} {sc.get("home","?")} - {sc.get("away","?")} {at}  [{m.get("status")}]')

        return matches
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', errors='replace')
        print(f'[ERROR] HTTP {e.code}: {e.reason}')
        print(f'[ERROR] Respuesta: {body[:500]}')
        return []


def map_results(api_matches):
    mapped = {}
    not_mapped = []
    for m in api_matches:
        status = m.get('status', '')
        if status not in ('FINISHED', 'IN_PLAY', 'PAUSED'):
            continue
        score = (m.get('score') or {}).get('fullTime') or {}
        gh, ga = score.get('home'), score.get('away')
        if gh is None or ga is None:
            continue

        ht_tla = (m.get('homeTeam') or {}).get('tla', '')
        at_tla = (m.get('awayTeam') or {}).get('tla', '')
        home = TLA_MAP.get(ht_tla)
        away = TLA_MAP.get(at_tla)
        if not home or not away:
            not_mapped.append(f'TLA desconocida: {ht_tla} o {at_tla}')
            continue

        utc_dt  = datetime.fromisoformat(m['utcDate'].replace('Z', '+00:00'))
        cot_dt  = utc_dt.astimezone(COT_TZ)
        cot_date = cot_dt.strftime('%Y-%m-%d')

        match_id = SCHEDULE.get((cot_date, home, away))
        if match_id:
            entry = {'home': gh, 'away': ga}
            if status in ('IN_PLAY', 'PAUSED'):
                entry['live'] = True
            mapped[match_id] = entry
        else:
            not_mapped.append(f'Sin ID: {cot_date} {home}-{away}')

    if not_mapped:
        print(f'[WARN] No mapeados ({len(not_mapped)}): {not_mapped[:10]}')
    return mapped


def main():
    results_path = os.path.join(os.path.dirname(__file__), '..', 'results.json')

    # 1. Descubrir el código de la competición
    comp_code = find_wc_code()
    if not comp_code:
        print('[EXIT] No se puede continuar sin código de competición. results.json no se modifica.')
        sys.exit(0)

    # 2. Descargar partidos
    api_matches = fetch_matches(comp_code)
    if not api_matches:
        print('[EXIT] No se recibieron partidos. results.json no se modifica.')
        sys.exit(0)

    # 3. Mapear a nuestros IDs
    new_results = map_results(api_matches)
    print(f'[INFO] Partidos mapeados con resultado: {len(new_results)}')

    # 4. Leer archivo actual y preservar fases eliminatorias (r*)
    try:
        with open(results_path, 'r', encoding='utf-8') as f:
            existing = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing = {}

    knockout = {k: v for k, v in existing.items() if k.startswith('r')}
    merged   = {**knockout, **new_results}
    merged['_updated'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

    with open(results_path, 'w', encoding='utf-8') as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f'[OK] results.json guardado con {len(new_results)} resultados de grupos.')


if __name__ == '__main__':
    main()
