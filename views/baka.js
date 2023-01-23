
let ar =new Array(3);

  ar.fill('.').map((e,id)=>
{
   let a = id+1;
   //console.log(a);
    ar[id]= a;
   // console.log('X:'+ar[id]);
});

for (let e = 0; e < ar.length; e++) {
    //ar[e]="a:"+e+1;

    console.log(ar[e]);
}

//console.log('Ola'+ar.length);