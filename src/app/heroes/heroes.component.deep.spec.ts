import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { Component, Input, NO_ERRORS_SCHEMA, Directive } from "@angular/core";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { windowCount } from "rxjs/operators";

describe("Heroes deep test",()=>{

    let HEROES;
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
      
    // @Directive({
    //     selector:'[routerLink]',
    //     //Know if onClick is called or not,
    //     host:{'(click)':'OnClick()'}
    // })
    // export class RouterLinkDirectiveStub{
    //     @Input('routerLink') linkParams:any;
    //     navigatedTo:any = null;

    //     onClick(){
    //         this.navigatedTo = this.linkParams;
    //     }
    // }
    beforeEach(()=>{
        HEROES = [
            {id:1, name:'spiderman',strength:8},
            {id:2, name:'superman',strength:10}
        ]
        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero'])
        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                HeroComponent,
                //RouterLinkDirectiveStub
        ],
        schemas :[NO_ERRORS_SCHEMA],
        providers:[
                {provide : HeroService, useValue:mockHeroService}
            ]
        })
        fixture = TestBed.createComponent(HeroesComponent);
    })

    it('should render each hero as HeroComponent',()=>{
        //Tell Karma what to do when subscribe on getHeroes is called,
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        //Initalize all parent n child
        fixture.detectChanges();

        const heroCompDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
        expect(heroCompDEs.length).toBe(2);
        for(let i=0;i<heroCompDEs.length;i++){
            expect(heroCompDEs[i].componentInstance.hero).toBe(HEROES[i]);
        }
    })

    it(`should call heroService.deleteHero when the Hero component's delete button 
    is clicked  `,()=>{
        //once the delete button triggers the event we have to check if delete is called then this method is called.
        spyOn(fixture.componentInstance,'delete');
         //Tell Karma what to do when subscribe on getHeroes is called,
         mockHeroService.getHeroes.and.returnValue(of(HEROES));

         //Initalize all parent n child
         fixture.detectChanges();

         //Get all hero componenets hold first.
         const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
         //Get first hero from list and then get delete button on that hero and trigger event.
        //  heroComponentDEs[0].query(By.css('button'))
        //  .triggerEventHandler('click',{stopPropagation:()=>{}});

        //Just go to child directly and ask it to emit the event.
        // <HeroComponent>(heroComponentDEs[0].componentInstance).delete.emit(undefined);

        //Another way raising events on child directive
        heroComponentDEs[0].triggerEventHandler('delete',null);

         expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })

    it("should add new hero when add button is clicked",()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();
        const name ="Mr.Ice";
        mockHeroService.addHero.and.returnValue(of({id:3, name:name, strength:200}));
        //We can use widout .nativeElement but we need it for setting value so get native DOM el instead of debugElement.
        const input = fixture.debugElement.query(By.css('input')).nativeElement;
        const addButton = fixture.debugElement.queryAll(By.css('button'))[0];       //Get first button i.e. add on this template

        input.value = name;
        addButton.triggerEventHandler('click',null);
        fixture.detectChanges();

        const newHero = fixture.debugElement.queryAll(By.css('li'))[2].nativeElement.textContent;
        expect(newHero).toContain(name);
    })
})