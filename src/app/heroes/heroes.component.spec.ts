import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe('HeroesComponent',()=>{

    let HEROES;
    let heroesComponent:HeroesComponent;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id:1, name:'spiderman',strength:8},
            {id:2, name:'superman',strength:10}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
        heroesComponent = new HeroesComponent(mockHeroService);
    });

    it("should remove a hero when delete is called",()=>{
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroesComponent.heroes = HEROES;

        heroesComponent.delete(HEROES[1])

        expect(heroesComponent.heroes.length).toBe(1);
    })
    
    it("should call deleteHero",()=>{
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroesComponent.heroes = HEROES;

        heroesComponent.delete(HEROES[1])

        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    })

    //To be done.
    xit("should get result from deleteHero",()=>{
        mockHeroService.deleteHero.and.returnValue(of(HEROES[1]));
        heroesComponent.heroes = HEROES;

        heroesComponent.delete(HEROES[1])

        expect(mockHeroService.deleteHero).toEqual(HEROES[1]);
    })
})