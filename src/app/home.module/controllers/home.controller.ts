import { Request, Response} from 'express';
export class HomeController {
    public index (req: Request, res: Response) {
        res.send('Hello World !!!');
    }
    public sayHello(req: Request, res:Response){
        res.send('Hey! This is Say Hello Method of Home Controller');
    }
}