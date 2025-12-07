import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. Plataformas
    const platforms = await prisma.platform.createMany({
        data: [
            { name: 'PlayStation' },
            { name: 'Xbox' },
            { name: 'Nintendo Switch' },
            { name: 'PC' },
        ],
    })

    // 2. Categorías
    const categories = await prisma.category.createMany({
        data: [
            { name: 'Acción' },
            { name: 'Aventura' },
            { name: 'RPG' },
            { name: 'Deportes' },
            { name: 'Shooter' },
            { name: 'Estrategia' },
            { name: 'Indie' },
        ],
    })

    // 3. Obtener IDs de plataformas y categorías
    const playstation = await prisma.platform.findUnique({ where: { name: 'PlayStation' } })
    const xbox = await prisma.platform.findUnique({ where: { name: 'Xbox' } })
    const pc = await prisma.platform.findUnique({ where: { name: 'PC' } })
    const nintendo = await prisma.platform.findUnique({ where: { name: 'Nintendo Switch' } })

    const accion = await prisma.category.findUnique({ where: { name: 'Acción' } })
    const aventura = await prisma.category.findUnique({ where: { name: 'Aventura' } })
    const rpg = await prisma.category.findUnique({ where: { name: 'RPG' } })
    const deportes = await prisma.category.findUnique({ where: { name: 'Deportes' } })
    const shooter = await prisma.category.findUnique({ where: { name: 'Shooter' } })
    const estrategia = await prisma.category.findUnique({ where: { name: 'Estrategia' } })
    const indie = await prisma.category.findUnique({ where: { name: 'Indie' } })

    // 4. Juegos (~50)
    const gamesData = [
        { 
            name: 'God of War Ragnarok', 
            description: 'Acción épica en PlayStation.', 
            platformId: playstation!.id, 
            categories: [accion!.id, aventura!.id],
            images: ['img/ragnarok.png'] 
        },
        { 
            name: 'Halo Infinite', 
            description: 'Shooter futurista en Xbox.', 
            platformId: xbox!.id, 
            categories: [shooter!.id, accion!.id],
            images: ['img/halo.png']  
        },
        { 
            name: 'The Legend of Zelda: Breath of the Wild', 
            description: 'Aventura en mundo abierto.', 
            platformId: nintendo!.id, 
            categories: [aventura!.id, rpg!.id],
            images: ['img/zelda.png']  
        },
        { 
            name: 'Elden Ring', 
            description: 'RPG desafiante en PC.', 
            platformId: pc!.id, 
            categories: [rpg!.id, aventura!.id],
            images: ['img/elden.png']  
        },
        { 
            name: 'FIFA 25', 
            description: 'Simulación de fútbol.', 
            platformId: xbox!.id, 
            categories: [deportes!.id],
            images: ['img/fifa.png']  
        },
        { 
            name: 'NBA 2K25', 
            description: 'Baloncesto realista.', 
            platformId: playstation!.id, 
            categories: [deportes!.id],
            images: ['img/nba.png']  
        },
        { 
            name: 'Call of Duty: Modern Warfare III', 
            description: 'Shooter bélico.', 
            platformId: pc!.id, 
            categories: [shooter!.id, accion!.id],
            images: ['img/callOfDuty.png']  
        },
        { 
            name: 'Super Mario Odyssey', 
            description: 'Plataformas y aventura.', 
            platformId: nintendo!.id, 
            categories: [aventura!.id, indie!.id],
            images: ['img/superMario.png']  
        },
        { 
            name: 'Minecraft', 
            description: 'Construcción y creatividad.', 
            platformId: pc!.id, 
            categories: [estrategia!.id, indie!.id],
            images: ['img/Minecraft.png']  
        },
        { 
            name: 'Fortnite', 
            description: 'Battle Royale multijugador.', 
            platformId: xbox!.id, 
            categories: [accion!.id, shooter!.id],
            images: ['img/Fortnite.png'] 
        },
        { 
            name: 'Cyberpunk 2077', 
            description: 'RPG futurista.', 
            platformId: pc!.id, 
            categories: [rpg!.id, accion!.id],
            images: ['img/Cyberpunk2077.png'] 
        },
        { 
            name: 'Gran Turismo 7', 
            description: 'Carreras realistas.', 
            platformId: playstation!.id, 
            categories: [deportes!.id, estrategia!.id],
            images: ['img/GrandTurismo.png'] 
        },
        { 
            name: 'Gears 5', 
            description: 'Shooter táctico.', 
            platformId: xbox!.id, 
            categories: [shooter!.id, accion!.id],
            images: ['img/Gears5.png'] 
        },
        { 
            name: 'League of Legends', 
            description: 'MOBA competitivo.', 
            platformId: pc!.id, 
            categories: [estrategia!.id, accion!.id],
            images: ['img/LeagueLegends.png'] 
        },
        { 
            name: 'Pokémon Scarlet', 
            description: 'Captura y combate Pokémon.', 
            platformId: nintendo!.id, 
            categories: [rpg!.id, aventura!.id],
            images: ['img/PokemonScarlet.png'] 
        },
        { 
            name: 'Horizon Forbidden West', 
            description: 'Aventura futurista.', 
            platformId: playstation!.id, 
            categories: [aventura!.id, accion!.id],
            images: ['img/HorizonForbidden.png'] 
        },
        { 
            name: 'Forza Horizon 5', 
            description: 'Carreras en mundo abierto.', 
            platformId: xbox!.id, 
            categories: [deportes!.id],
            images: ['img/ForzaHorizon.png'] 
        },
        { 
            name: 'Counter-Strike 2', 
            description: 'Shooter competitivo.', 
            platformId: pc!.id, 
            categories: [shooter!.id],
            images: ['img/CounterStrike.png'] 
        },
        { 
            name: 'Splatoon 3', 
            description: 'Shooter colorido.', 
            platformId: nintendo!.id, 
            categories: [shooter!.id, indie!.id],
            images: ['img/Splatoon.png'] 
        },
        { 
            name: 'Starfield', 
            description: 'Exploración espacial y RPG.', 
            platformId: xbox!.id, 
            categories: [rpg!.id, aventura!.id],
            images: ['img/Starfield.png'] 
        },
        { 
            name: 'Ghost of Tsushima', 
            description: 'Aventura samurái en Japón feudal.', 
            platformId: playstation!.id, 
            categories: [accion!.id, aventura!.id],
            images: ['img/GhostTsushima.png'] 
        },
        { 
            name: 'Doom Eternal', 
            description: 'Shooter frenético contra demonios.', 
            platformId: pc!.id, 
            categories: [shooter!.id, accion!.id],
            images: ['img/DoomEternal.png'] 
        },
        { 
            name: 'Mario Kart 8 Deluxe', 
            description: 'Carreras divertidas con personajes de Nintendo.', 
            platformId: nintendo!.id, 
            categories: [deportes!.id, estrategia!.id],
            images: ['img/MarioDeluxe.png'] 
        },
        { 
            name: 'The Witcher 3: Wild Hunt', 
            description: 'RPG épico de fantasía.', 
            platformId: pc!.id, 
            categories: [rpg!.id, aventura!.id],
            images: ['img/TheWitcher.png'] 
        },
        { 
            name: 'Uncharted 4', 
            description: 'Aventura cinemática llena de acción.', 
            platformId: playstation!.id, 
            categories: [accion!.id, aventura!.id],
            images: ['img/Uncharted.png'] 
        },
        { 
            name: 'Sea of Thieves', 
            description: 'Aventura multijugador pirata.', 
            platformId: xbox!.id, 
            categories: [aventura!.id, accion!.id],
            images: ['img/SeaThieves.png'] 
        },
        { 
            name: 'Stardew Valley', 
            description: 'Simulación y vida en una granja.', 
            platformId: nintendo!.id, 
            categories: [indie!.id, estrategia!.id],
            images: ['img/StardewValley.png'] 
        },
        { 
            name: 'Valorant', 
            description: 'Shooter táctico competitivo.', 
            platformId: pc!.id, 
            categories: [shooter!.id],
            images: ['img/Valorant.png'] 
        },
        { 
            name: 'Rocket League', 
            description: 'Fútbol con coches acrobáticos.', 
            platformId: pc!.id, 
            categories: [deportes!.id, accion!.id],
            images: ['img/RocketLeague.png'] 
        },
        { 
            name: 'Death Stranding', 
            description: 'Aventura futurista de mundo abierto.', 
            platformId: playstation!.id, 
            categories: [aventura!.id],
            images: ['img/DeathStranding.png'] 
        },
        { 
            name: 'Ori and the Will of the Wisps', 
            description: 'Aventura y plataformas emotivas.', 
            platformId: xbox!.id, 
            categories: [indie!.id, aventura!.id],
            images: ['img/Ori.png'] 
        },
        { 
            name: 'Hades', 
            description: 'Roguelike de acción mitológica.', 
            platformId: pc!.id, 
            categories: [accion!.id, indie!.id],
            images: ['img/Hades.png'] 
        },
        { 
            name: 'Fire Emblem: Three Houses', 
            description: 'Estrategia táctica y RPG.', 
            platformId: nintendo!.id, 
            categories: [estrategia!.id, rpg!.id],
            images: ['img/FireEmblem.png'] 
        },
        { 
            name: 'Granblue Fantasy: Relink', 
            description: 'RPG de acción cooperativa.', 
            platformId: playstation!.id, 
            categories: [rpg!.id, accion!.id],
            images: ['img/GranblueFantasy.png'] 
        },
        { 
            name: 'Hi-Fi RUSH', 
            description: 'Acción rítmica estilo animé.', 
            platformId: xbox!.id, 
            categories: [accion!.id, indie!.id],
            images: ['img/HI-FI.png']  
        },
        { 
            name: 'Baldur’s Gate 3', 
            description: 'RPG profundo por turnos.', 
            platformId: pc!.id, 
            categories: [rpg!.id, estrategia!.id],
            images: ['img/BaldurGate.png']  
        },
        { 
            name: 'Metroid Dread', 
            description: 'Aventura y exploración intensa.', 
            platformId: nintendo!.id, 
            categories: [aventura!.id, accion!.id],
            images: ['img/MetroidDread.png']  
        },
        { 
            name: 'The Last of Us Part II', 
            description: 'Aventura dramática y acción.', 
            platformId: playstation!.id, 
            categories: [accion!.id, aventura!.id],
            images: ['img/LastUSD.png']  
        },
        { 
            name: 'Forza Motorsport', 
            description: 'Simulación de carreras.', 
            platformId: xbox!.id, 
            categories: [deportes!.id],
            images: ['img/ForzaMotorsport.png']  
        },
        { 
            name: 'Overwatch 2', 
            description: 'Shooter de héroes.', 
            platformId: pc!.id, 
            categories: [shooter!.id, accion!.id],
            images: ['img/Overwatch.png']  
        },
        { 
            name: 'Hollow Knight', 
            description: 'Aventura indie en un mundo subterráneo.', 
            platformId: nintendo!.id, 
            categories: [indie!.id, aventura!.id],
            images: ['img/HollowKnight.png']  
        },
        { 
            name: 'Dragon Age: Dreadwolf', 
            description: 'RPG épico de fantasía oscura.', 
            platformId: pc!.id, 
            categories: [rpg!.id, aventura!.id],
            images: ['img/DragonAge.png']  
        },
        { 
            name: 'Spider-Man 2', 
            description: 'Acción superhéroe en mundo abierto.', 
            platformId: playstation!.id, 
            categories: [accion!.id, aventura!.id],
            images: ['img/Spider-Man.png']  
        },
        { 
            name: 'Grounded', 
            description: 'Supervivencia en miniatura.', 
            platformId: xbox!.id, 
            categories: [aventura!.id, indie!.id],
            images: ['img/Grounded.png']  
        },
        { 
            name: 'Path of Exile', 
            description: 'RPG de acción oscuro.', 
            platformId: pc!.id, 
            categories: [rpg!.id, accion!.id],
            images: ['img/PathExile.png'] 
        },
        { 
            name: 'Luigi’s Mansion 3', 
            description: 'Aventura y exploración ligera.', 
            platformId: nintendo!.id, 
            categories: [aventura!.id, indie!.id],
            images: ['img/LuigiMansion.png']  
        },
        { 
            name: 'Bloodborne', 
            description: 'Acción brutal gótica.', 
            platformId: playstation!.id, 
            categories: [accion!.id, rpg!.id],
            images: ['img/Bloodborne.png']  
        },
        { 
            name: 'Halo: The Master Chief Collection', 
            description: 'Colección de shooters legendarios.', 
            platformId: xbox!.id, 
            categories: [shooter!.id, accion!.id],
            images: ['img/HaloMaster.png']  
        },
        { 
            name: 'Satisfactory', 
            description: 'Construcción industrial y estrategia.', 
            platformId: pc!.id, 
            categories: [estrategia!.id, indie!.id],
            images: ['img/Satisfactory.png']  
        },

    ]

    for (const g of gamesData) {
        await prisma.game.create({
            data: {
                name: g.name,
                description: g.description,
                platformId: g.platformId,
                categories: {
                    create: g.categories.map((c) => ({ categoryId: c })),
                },
                images: {
                    create: g.images.map((url) => ({ url })),
                }
            },
        })
    }
}

main()
    .then(() => console.log('Seed ejecutado con éxito 🚀'))
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect()
    })
