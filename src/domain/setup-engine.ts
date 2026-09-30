import type { Car, Track } from "../data/gt7";

export type SetupInput = { car:Car; track:Track; tire:string; weather:string; objective:string; style:string; difficulty:string[]; notes:string };
export type SetupResult = { front:{height:number; compression:number; expansion:number; naturalFrequency:number; antiRoll:number; camber:number; toe:number}; rear:{height:number; compression:number; expansion:number; naturalFrequency:number; antiRoll:number; camber:number; toe:number}; diff:{initialTorque:number; acceleration:number; braking:number}; aero:{front:number; rear:number}; reasoning:string[]; changes:string[]; warnings:string[]; confidence:number };

export function generateSetup(input:SetupInput):SetupResult {
 const {car,track}=input; const highSpeed=track.straight>=900 || track.length>=5500; const technical=track.curves>=15 && track.straight<900; const elevation=track.elevation>=50; const curb=input.difficulty.includes("Zebras");
 let frontHeight=highSpeed?70:technical?78:75, rearHeight=highSpeed?82:technical?88:85;
 let frontAR=highSpeed?4:technical?6:5, rearAR=highSpeed?5:technical?5:6;
 let frontCamber=highSpeed?2.2:2.8, rearCamber=highSpeed?1.8:2.4;
 let frontToe=input.style==="Mais dianteiro"?0.12:input.style==="Mais estável"?-0.02:0.05;
 let rearToe=input.style==="Mais traseiro"?0.18:input.style==="Mais estável"?0.20:0.10;
 let frontNF=highSpeed?3.10:technical?3.35:3.20, rearNF=highSpeed?3.25:technical?3.45:3.30;
 let diffAcc=car.drive==="FF"?38:car.drive==="4WD"?42:car.drive==="MR"||car.drive==="RR"?32:35;
 let diffBrake=car.drive==="MR"||car.drive==="RR"?24:30;
 if(curb){frontAR=Math.max(2,frontAR-1);rearAR=Math.max(2,rearAR-1);frontNF-=0.12;rearNF-=0.12;}
 if(elevation){frontHeight+=3;rearHeight+=3;}
 if(input.objective==="Velocidade máxima"){frontHeight-=4;rearHeight-=3;}
 if(input.objective==="Estabilidade"||input.style==="Mais estável"){frontAR=Math.max(2,frontAR-1);rearAR+=1;diffBrake+=6;}
 if(input.style==="Mais agressivo"){frontAR+=1;rearAR-=1;frontToe+=0.06;}
 if(input.weather.includes("Chuva")||input.weather.includes("molhada")){frontHeight+=8;rearHeight+=8;frontNF-=0.25;rearNF-=0.25;diffAcc-=8;}
 const reasoning:string[]=[];
 reasoning.push(`${track.name}: ${track.length} m, ${track.curves} curvas e reta máxima de ${track.straight} m entram diretamente na escolha de altura, rigidez e carga.`);
 if(highSpeed) reasoning.push("Perfil de alta velocidade: a prioridade é reduzir arrasto e manter o carro estável nas zonas rápidas.");
 if(technical) reasoning.push("Perfil técnico: mais suporte mecânico para mudanças de direção e curvas consecutivas.");
 if(curb) reasoning.push("Zebras marcadas como dificuldade: suspensão suavizada para absorver agressões sem perder controle.");
 if(elevation) reasoning.push("Desnível relevante: altura ligeiramente maior para ampliar margem de contato com o piso.");
 if(input.style!=="Neutro") reasoning.push(`O estilo “${input.style}” desloca o compromisso do setup conforme solicitado.`);
 if(input.objective) reasoning.push(`Objetivo principal: ${input.objective}.`);
 const warnings=["Os limites específicos deste carro ainda não foram confirmados; os valores mostrados são uma recomendação inicial e não substituem validação no GT7."];
 return {front:{height:frontHeight,compression:highSpeed?28:32,expansion:highSpeed?38:42,naturalFrequency:+frontNF.toFixed(2),antiRoll:frontAR,camber:+frontCamber.toFixed(2),toe:+frontToe.toFixed(2)},rear:{height:rearHeight,compression:highSpeed?30:34,expansion:highSpeed?40:44,naturalFrequency:+rearNF.toFixed(2),antiRoll:rearAR,camber:+rearCamber.toFixed(2),toe:+rearToe.toFixed(2)},diff:{initialTorque:input.style==="Mais estável"?12:10,acceleration:Math.max(0,Math.min(100,diffAcc)),braking:Math.max(0,Math.min(100,diffBrake))},aero:{front:highSpeed?450:technical?650:550,rear:highSpeed?600:technical?800:700},reasoning,changes:["Base criada a partir do perfil da pista, carro, objetivo, estilo e dificuldade informados."],warnings,confidence:highSpeed||technical?0.72:0.62};
}
