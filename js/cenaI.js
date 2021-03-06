import Jogador from "./jogador.js";
import Inimigo from "./inimigo.js";
import Tocha from "./tocha.js";
import Tiro from "./Tiro.js";


export default class cenaI extends Phaser.Scene {
    constructor() {
        super({
            key: 'cenaI'
        });
    }

    preload() {

    }

    create() {
        //Inicio cenario
        const background = this.add.graphics();
        background.fillStyle(0x000000, 1);
        background.fillRect(0, 0, 1080, 480);

        this.criaCenario();
        //fim cenario

        //Jogador
        let jogador = new Jogador(this, 50, 130);
        this.Jogador = jogador;
        this.physics.add.collider(jogador.sprite, this.plataformas);
        this.physics.add.collider(jogador.sprite, this.portal, () => {
            this.scene.start('cenaIII');
        });

        this.barraDeVida = this.add.graphics();
        this.barraDeVida.fillStyle(0xff0000, 1);
        this.barraDeVida.fillRect(356, 450, jogador.vida, 10);
        this.barraDeVida.lineStyle(4, 0xffffff, 1);
        this.barraDeVida.strokeRect(356, 450, 100, 10);
        this.barraDeVida.setScrollFactor(0);
        //fim Jogador

        //inimigos
        let inimigos = [];
        let velocidade = 35;
        let inivida = 20;
        let alcance = 150;

        inimigos.push(new Inimigo(this, 800, 400, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 750, 300, 'cav', velocidade, inivida, alcance));

        inimigos.push(new Inimigo(this, 890, 165, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 800, 100, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 700, 300, 'cav', velocidade, inivida, alcance));

        inimigos.push(new Inimigo(this, 450, 100, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 350, 150, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 200, 50, 'cav', velocidade, inivida, alcance));

        inimigos.push(new Inimigo(this, 658, 389, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 800, 200, 'cav', velocidade, inivida, alcance));

        inimigos.push(new Inimigo(this, 850, 115, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 750, 150, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 700, 400, 'cav', velocidade, inivida, alcance));

        inimigos.push(new Inimigo(this, 500, 100, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 300, 120, 'cav', velocidade, inivida, alcance));
        inimigos.push(new Inimigo(this, 150, 100, 'cav', velocidade, inivida, alcance));


        for(let i = 0; i < inimigos.length; i ++){
            this.physics.add.collider(inimigos[i].sprite, this.plataformas);
            this.physics.add.collider(inimigos[i].sprite, jogador.sprite);
        }
        for(let i = 0; i < inimigos.length; i ++){
            for(let g = 0; g < inimigos.length; g ++){
                this.physics.add.collider(inimigos[i].sprite, inimigos[g].sprite);
            }
        }
        this.inimigos = inimigos;
        //fim inimigos
    

        //Tochas
        let tochas = [];

        tochas.push(new Tocha(this, 50, 25));
        tochas.push(new Tocha(this, 150, 25));
        tochas.push(new Tocha(this, 400, 25));

        tochas.push(new Tocha(this, 800, 56));
        tochas.push(new Tocha(this, 650, 56));

        tochas.push(new Tocha(this, 700, 285));
        
        
        this.tochas = tochas;
        // Fim tochas


        //Configurações adicionais
        this.teclas = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
            shoot:Phaser.Input.Keyboard.KeyCodes.T,
        }); 
        this.cameras.main.setBounds(0, 0, 950, 480);
        this.cameras.main.startFollow(jogador, false, 1, 1);
        this.cameras.main.setZoom(2);
        //fim configurações
        
    }
    update() {
        const jogador = this.Jogador.sprite;
        const inimigos = this.inimigos;
        const tochas = this.tochas;

        //Assets
            //Tochas
        for(let t = 0; t < tochas.length; t++){
            tochas[t].sprite.anims.play('queimar', true);
        }
        //fim Assets

        //Controle de camera
        if(this.teclas.left.isDown && this.Jogador.x > 0){
            this.Jogador.x -= 1.5;
        }else if(this.teclas.right.isDown && this.Jogador.x < 950){
            this.Jogador.x += 1.5;
        }if(this.teclas.up.isDown && this.Jogador.y > 0){
            this.Jogador.y -= 1.5;
        }else if (this.teclas.down.isDown && this.Jogador.y < 480){
            this.Jogador.y += 1.5;
        }
        //fim controle de camera
        
        //Movimentação e colisão do inimigo
        for(let i = 0; i < inimigos.length; i++){
            inimigos[i].ver(jogador.getCenter());
            if(inimigos[i].ver(jogador.getCenter()) <= (inimigos[i].h/2 + 5)){
                this.inimigos[i].atualizaVida(this.inimigos, this.inimigos[i], 10);    
                this.atualizaVida();
            }     
        }
        //fim movimentação e colisão

        
        
        //movimentação do personagem
        if(this.teclas.left.isDown) {
            jogador.setVelocityX(-100);
            jogador.setFlip(true, false)
            jogador.anims.play('esquerda', true);
            this.Jogador.lado = 'E';
        }else if (this.teclas.right.isDown) {
            jogador.setVelocityX(100);
            jogador.setFlip(false, false)
            jogador.anims.play('direita', true);
            this.Jogador.lado = 'D';
        } else if(this.teclas.up.isDown){
            jogador.setVelocityY(-100);
            jogador.setFlip(false, false)
            jogador.anims.play('cima', true);
            this.Jogador.lado = 'C';
        }else if(this.teclas.down.isDown){
            jogador.setVelocityY(100);
            jogador.setFlip(false, false)
            jogador.anims.play('baixo', true);
            this.Jogador.lado = 'B';
        }else {
            jogador.setVelocityX(0);
            jogador.setVelocityY(0);
            jogador.anims.play('idle', true);
        }

        this.input.on('pointermove', (e) => {
            this.pointerX = e.x;
            this.pointerY = e.y;
        });
        this.input.on('pointerdown', () => {
            jogador.anims.play('atira', true);
            this.atualizaTiro(); 
        })

        
        //fim movimentação do personagem
        
    }

    atualizaTiro(){
        if(this.Jogador.podeAtirar == true){
            this.Jogador.atirar(this.pointerX, this.pointerY);
            for(let j = 0; j < this.Jogador.tiro.length; j++){
                console.log(this.pointerX, this.pointerY);
                
                
                for(let i = 0; i < this.inimigos.length; i ++){
                    let aux;
                    this.physics.add.collider(this.inimigos[i].sprite, this.Jogador.tiro[j].sprite, () => {
                        this.Jogador.destroi(this.Jogador.tiro[j]);
                        this.inimigos[i].atualizaVida(this.inimigos, this.inimigos[i], 10);
                    });
                }
                this.physics.add.collider(this.plataformas, this.Jogador.tiro[j].sprite, () => {
                    this.Jogador.destroi(this.Jogador.tiro[j]);
                });
                this.physics.add.collider(this.Jogador.sprite, this.Jogador.tiro[j].sprite);
            }
        }   
    }

    atualizaVida(){
        this.Jogador.vida = this.Jogador.vida - 15;
        if(this.Jogador.vida <= 0){
            this.barraDeVida.clear()
            this.barraDeVida.fillStyle(0xff0000, 1);
            this.barraDeVida.fillRect(356, 450, 0, 10);
            this.barraDeVida.lineStyle(4, 0xffffff, 1);
            this.barraDeVida.strokeRect(356, 450, 100, 10);
            this.scene.start('cutII');
        }else{
            this.barraDeVida.clear()
            this.barraDeVida.fillStyle(0xff0000, 1);
            this.barraDeVida.fillRect(356, 450, this.Jogador.vida, 10);
            this.barraDeVida.lineStyle(4, 0xffffff, 1);
            this.barraDeVida.strokeRect(356, 450, 100, 10);
        }
    }

    criaCenario(){
        let i = 0;
        let c = 0;
        let auy = 0;
        let aux = 0;
        let tamX = 10;
        let tamY = 5;
        this.plataformas = this.physics.add.staticGroup();
        this.portal = this.physics.add.staticGroup();

        
        this.plataformas.create(32, 20, 'bse').setOrigin(0, 0).refreshBody().setSize(32, 11, false);
        this.plataformas.create(32, 20, 'bse').setOrigin(0, 0).refreshBody().setSize(8, 32, false);

        //for para a parede superior
        for(i = 0; i < tamX; i++){
            this.plataformas.create((64+(32*i)), 20, 'ms').setOrigin(0, 0).refreshBody().setSize(32, 11, false);;
        }

        aux = (64+(32*i));

        this.plataformas.create(aux, 20, 'bsd').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
        this.plataformas.create(aux, 20, 'bsd').setOrigin(0, 0).refreshBody().setSize(32, 11, false);
        
        //for para a parede da esquerda
        for(i = 0; i < tamY; i++){
            if(i == 2){
                this.plataformas.create(32, (52+(32*i)), 'pedp').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(0, 0);
            }else{
                this.plataformas.create(32, (52+(32*i)), 'pm').setOrigin(0, 0).refreshBody().setSize(8, 32, false);
            }
        }

        auy = (52+(32*i));

        this.plataformas.create(32, auy, 'bie').setOrigin(0, 0).refreshBody().setSize(8, 32, false);
        this.plataformas.create(32, auy, 'bie').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);

        //for para a parede inferior
        for(i = 0; i < tamX; i++){
            this.plataformas.create((64+(32*i)), auy, 'mi').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
        }

        this.plataformas.create(aux, auy, 'bid').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
        this.plataformas.create(aux, auy, 'bid').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);

        auy = auy - 32;

        //for para a parede da direita
        for(i = 0; i < tamY; i++){
            let a = 0;
            //corredor
            if(i == 3){
                this.plataformas.create(aux, (auy-(32*i)), 'ch0').setOrigin(0, 0).refreshBody().setSize(8, 4, false).setOffset(24, 0);
                this.plataformas.create(aux, (auy-(32*i)), 'ch0').setOrigin(0, 0).refreshBody().setSize(8, 4, false).setOffset(24, 26);
                for(c = 0; c <= 5; c++){
                    this.plataformas.create((aux+32) + (32*c), (auy-(32*i)), 'ch1').setOrigin(0, 0).refreshBody().setSize(32, 6, false).setOffset(0, 26);
                    this.plataformas.create((aux+32) + (32*c), (auy-(32*i)), 'ch1').setOrigin(0, 0).refreshBody().setSize(32, 4, false).setOffset(0, 0);
                }
                this.plataformas.create((aux+32) + (32*c), (auy-(32*c))+64, 'bse').setOrigin(0, 0).refreshBody().setSize(32, 11, false);
                this.plataformas.create((aux+32) + (32*c), (auy-(32*c))+64, 'bse').setOrigin(0, 0).refreshBody().setSize(8, 32, false);
                this.plataformas.create((aux+32) + (32*c), (auy-(32*i)), 'ch2').setOrigin(0, 0).refreshBody().setSize(8, 4, false).setOffset(0, 0);
                this.plataformas.create((aux+32) + (32*c), (auy-(32*i)), 'ch2').setOrigin(0, 0).refreshBody().setSize(8, 6, false).setOffset(0, 26);
                for(a = 0; a < 3; a++){
                    this.plataformas.create((aux+32) + (32*c), (116+(32*a)), 'pm').setOrigin(0, 0).refreshBody().setSize(8, 32, false);
                }
                this.plataformas.create((aux+32) + (32*c), (116+(32*a)), 'bie').setOrigin(0, 0).refreshBody().setSize(8, 32, false);    
                this.plataformas.create((aux+32) + (32*c), (116+(32*a)), 'bie').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
                for(a = 0; a < 8; a++){
                    if(a == 4){
                        let c = 0
                        this.plataformas.create((aux+256) + (32*a), (116+(32*3)), 'cvb0').setOrigin(0, 0).refreshBody().setSize(4, 8, false).setOffset(0, 24);
                        this.plataformas.create((aux+256) + (32*a), (116+(32*3)), 'cvb0').setOrigin(0, 0).refreshBody().setSize(4, 8, false).setOffset(26, 24);
                        this.plataformas.create((aux+256) + (32*a), (116+(32*4)), 'cvb1').setOrigin(0, 0).refreshBody().setSize(6, 32, false).setOffset(0, 0);
                        this.plataformas.create((aux+256) + (32*a), (116+(32*4)), 'cvb1').setOrigin(0, 0).refreshBody().setSize(6, 32, false).setOffset(26, 0);
                        this.plataformas.create((aux+256) + (32*a), (116+(32*5)), 'cvb2').setOrigin(0, 0).refreshBody().setSize(6, 8, false).setOffset(0, 0);
                        this.plataformas.create((aux+256) + (32*a), (116+(32*5)), 'cvb2').setOrigin(0, 0).refreshBody().setSize(6, 8, false).setOffset(26, 0);
                        for(c = 0; c < 3; c++){
                            this.plataformas.create((aux+256) + (32*c)+32, (116+(32*5)), 'ms').setOrigin(0, 0).refreshBody().setSize(32, 11, false);;
                        }
                        this.plataformas.create((aux+256), (116+(32*5)), 'bse').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(0, 0);
                        this.plataformas.create((aux+256), (116+(32*5)), 'bse').setOrigin(0, 0).refreshBody().setSize(32, 11, false);
                        for(c = 0; c < 2; c++){
                            this.plataformas.create((aux+256) + (32*c)+160, (116+(32*5)), 'ms').setOrigin(0, 0).refreshBody().setSize(32, 11, false);;
                        }
                        this.plataformas.create((aux+256) + (32*c)+160, (116+(32*5)), 'bsd').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
                        this.plataformas.create((aux+256) + (32*c)+160, (116+(32*5)), 'bsd').setOrigin(0, 0).refreshBody().setSize(32, 11, false);   
                        for(c = 1; c < 5; c++){
                            this.plataformas.create((aux+256) + (32*2)+160, (116+(32*(5+c))), 'pmd').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
                        }
                        this.plataformas.create((aux+256) + (32*2)+160, (116+(32*(5+c))), 'bid').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
                        this.plataformas.create((aux+256) + (32*2)+160, (116+(32*(5+c))), 'bid').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
                        for(c = 1; c < 7; c++){
                            if(c == 5){
                                this.plataformas.create((aux+256) + (32*c), (116+(320)), 'mip').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
                                this.portal.create((aux+256) + (32*c), (116+(320)), 'mip').setOrigin(0, 0).refreshBody().setSize(16, 2, false).setOffset(8, 18);
                            }else{
                                this.plataformas.create((aux+256) + (32*c), (116+(320)), 'mi').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
                            }
                        }
                        this.plataformas.create((aux+256), (116+(320)), 'bie').setOrigin(0, 0).refreshBody().setSize(8, 32, false);    
                        this.plataformas.create((aux+256), (116+(320)), 'bie').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
                        for(c = 1; c < 5; c++){
                            this.plataformas.create((aux+256), (116+(320)-(32*c)), 'pm').setOrigin(0, 0).refreshBody().setSize(8, 32, false);
                        }
                    }else{
                        this.plataformas.create((aux+256) + (32*a), (116+(32*3)), 'mi').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
                    }
                }
                this.plataformas.create((aux+256) + (32*a), auy+32, 'bid').setOrigin(0, 0).refreshBody().setSize(32, 11, false).setOffset(0, 21);
                this.plataformas.create((aux+256) + (32*a), auy+32, 'bid').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
                for(a = 0; a < 4; a++){
                    this.plataformas.create(aux+512, (auy-(32*a)), 'pmd').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
                }
                this.plataformas.create(aux+512, (auy-(32*a)), 'bsd').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
                this.plataformas.create(aux+512, (auy-(32*a)), 'bsd').setOrigin(0, 0).refreshBody().setSize(32, 11, false);
                for(a = 1; a < 9; a++){
                    this.plataformas.create((aux+512-(32*a)), (auy-(128)), 'ms').setOrigin(0, 0).refreshBody().setSize(32, 11, false);;
                }
            }else{
                this.plataformas.create(aux, (auy-(32*i)), 'pmd').setOrigin(0, 0).refreshBody().setSize(8, 32, false).setOffset(24, 0);
            }
        }

        //for para preencher o chão
        for(i = 0; i < tamY; i++){
            for(let c = 0; c < tamX; c++){
                this.add.image((64+(32*c)), (52+(32*i)), 'm').setDisplayOrigin(0, 0);
            }
        }
        for(let a = 0; a < 4; a++){
            for(let c = 0; c < 8; c++){
                this.add.image((aux+512-(32*c)-32), (84+(32*a)), 'm').setDisplayOrigin(0, 0);
            }
        }
        for(let a = 0; a < 4; a++){
            for(let c = 0; c < 6; c++){
                this.add.image((aux +288 ) + (32*c), (auy+128 +(32*a)), 'm').setDisplayOrigin(0, 0);
            }
        }
    }
}