import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { MessageService } from "./message.service";

describe("Hero service",()=>{

    let mockMsgSrvc;
    let httpTestingController ;
    let service:HeroService;

    beforeEach(()=>{

        mockMsgSrvc = jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers :[
                HeroService,
                {provide :MessageService, useValue : mockMsgSrvc}
            ]
        })
        httpTestingController=TestBed.get(HttpTestingController);
        service = TestBed.get(HeroService);
    })

    describe("get hero",()=>{

        it("should get correct url ",()=>{
            service.getHero(4).subscribe();
            //To make this fail add verify in httpTestingController
            //service.getHero(3).subscribe();

            //Tell mock Http to give a call
            const req = httpTestingController.expectOne('api/heroes/4');
            //Now what to return whn a call is given.
            req.flush({id:4,name:'SuperDude',strength:100});
            httpTestingController.verify();
        })
    })
})

