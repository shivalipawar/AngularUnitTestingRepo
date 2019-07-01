import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("HeroDetailComponent",()=>{
    let fixture:ComponentFixture<HeroDetailComponent>;
    let mockHeroService,mockRoute,mockLocation;

    beforeEach(()=>{
        mockHeroService = jasmine.createSpyObj(['getHero','updateHero']);
        mockLocation = jasmine.createSpyObj(['back']);
        mockRoute = {
            snapshot :{paramMap:{get:()=>{return '3';}}}
        }

        TestBed.configureTestingModule({
            imports :[FormsModule],
            declarations:[HeroDetailComponent],
            providers:[
                {provide:HeroService, useValue:mockHeroService},
                {provide:ActivatedRoute, useValue:mockRoute},
                {provide:Location, useValue:mockLocation}
            ]
        })
        fixture = TestBed.createComponent(HeroDetailComponent);
    })

    it("should render hero name in h2 tag",()=>{
        mockHeroService.getHero.and.returnValue(of({id:1,name:'superdude',strength:12}));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    })

    it("should call updateHero when save is called",(done)=>{
        mockHeroService. updateHero.and.returnValue(of({}));
        fixture.detectChanges();

        fixture.componentInstance.save();

        setTimeout(()=>{
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            done();
        },300);
    })
})