/* eslint indent: "off" */

function Asks() {
	return (
		<div className="row justify-content-center">
			<div className="col-8 col-lg-4" data-aos="fade-right" data-aos-once="true" data-aos-duration="900">
				<div className="list-group" id="list-tab" role="tablist">
					<a className="list-group-item list-group-item-action" id="list-duvida-1" data-toggle="list" href="#list-duvida1" role="tab" aria-controls="duvida1">A plataforma é segura?</a>
					<a className="list-group-item list-group-item-action" id="list-duvida-2" data-toggle="list" href="#list-duvida2" role="tab" aria-controls="duvida2">Sou novo por aqui, como ganho curtidas?</a>
					<a className="list-group-item list-group-item-action" id="list-duvida-3" data-toggle="list" href="#list-duvida3" role="tab" aria-controls="duvida3">Quantas curtidas irei ganhar?</a>
					<a className="list-group-item list-group-item-action" id="list-duvida-4" data-toggle="list" href="#list-duvida4" role="tab" aria-controls="duvida4">Como funciona o Likearns?</a>
					<a className="list-group-item list-group-item-action" id="list-duvida-5" data-toggle="list" href="#list-duvida5" role="tab" aria-controls="duvida5">E se eu der unfollow/descurtir? Irei ser penalizado?</a>
					<a className="list-group-item list-group-item-action" id="list-duvida-6" data-toggle="list" href="#list-duvida6" role="tab" aria-controls="duvida6">O que são os EC's?</a>
					<a className="list-group-item list-group-item-action" id="list-duvida-7" data-toggle="list" href="#list-duvida7" role="tab" aria-controls="duvida7">Como consigo esses EC's?</a>
				</div>
			</div>
			<div className="col-10 col-lg-6 my-lg-auto my-md-auto mt-5 ml-3 text-lg-left text-md-left text-sm-left text-center">
				<div className="tab-content" id="nav-tabContent">
					<div className="tab-pane fade" id="list-duvida1" role="tabpanel" aria-labelledby="list-duvida-1">
						Sim!! Quanto a segurança pode ficar tranquilo, seus dados na criação da conta são bem guardados e criptografados pelo sistema.
						Você pode logar com sua conta do instagram ou twitter diretamente do nosso site e você não tem do que preocupar, inclusive possuimos certificado
						de segurança.
                    </div>
					<div className="tab-pane fade" id="list-duvida2" role="tabpanel" aria-labelledby="list-duvida-2">
						Primeiramente escolha em qual rede social queres ganhar. Depois escolha a opção de ganhar curtidas e basta copiar o link da postagem que você
						quer ganhar a curtida, escolher o tempo que ela permanecerá visivel para os outros usuários e publicar, será tirado uma quantidade de pontos
						da sua conta Likearns, porém as curtidas irão para sua postagem.
                    </div>
					<div className="tab-pane fade" id="list-duvida3" role="tabpanel" aria-labelledby="list-duvida-3">
						Depende do tempo que sua postagem irá estar visivel para os outros usuários em nosso sistema.
                    </div>
					<div className="tab-pane fade" id="list-duvida3" role="tabpanel" aria-labelledby="list-duvida-3">
						Depende do tempo que sua postagem irá estar visivel para os outros usuários em nosso sistema e da hora que você publicou sua postagem em nosso site.
                    </div>
					<div className="tab-pane fade" id="list-duvida4" role="tabpanel" aria-labelledby="list-duvida-4">
						O Likearns é um sistema de troca de seguidores e curtidas em perfis de algumas redes sociais, porém com a possibilidade de ganhar dinheiro em sua conta
						Paypal apenas trocando os pontos acumulados em nosso sistema.
                    </div>
					<div className="tab-pane fade" id="list-duvida5" role="tabpanel" aria-labelledby="list-duvida-5">
						Se você der unfollow ou descurtir algum perfil ou alguma postagem, você será alertado e perderá pontos em nosso sitema, podendo ficar com pontos negativos.
                    </div>
					<div className="tab-pane fade" id="list-duvida6" role="tabpanel" aria-labelledby="list-duvida-6">
						EC significa EarnsCoins, que são seus pontos adquiridos no nosso site.
                    </div>
					<div className="tab-pane fade" id="list-duvida7" role="tabpanel" aria-labelledby="list-duvida-7">
						Você pode adquirir EC curtindo ou seguindo postagens/pessoas em nosso sistema, assistindo anúncios que são gerados todos os dias já com o intuito de
						você ganhar mais pontos de forma rápida e indicando os seus amigos a usar nosso sistema.
                    </div>
				</div>
			</div>
		</div>
	);
}

export default Asks;
