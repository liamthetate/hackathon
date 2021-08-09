// LIAM'S LEVEL DESIGN 
//   - Every 'brick' causing rotation, blocks don't,
//     - Collect 7 biscuits on each level to truly complete it

const maps = [

  // 2 easy test levels

  [
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                            -+',
    '                            ()',
    '== =x=x=x=x=  =x  x==x=====x==',
  ],

  [
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                            -+',
    '       $$                   ()',
    '== ====xx===  xx  x==x===x====',
  ],

  // LEVEL 1
  // - intro of weird mechanics
  // - enemy
  // - collecting coins
  // - going into tea cup

  [
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                              ',
    '                       $    $ ',
    '                        $   -+',
    '          ^       $  $   $ $()',
    '== ==x======  x=  x  x   =====',
  ],

  // LEVEL 2
  // - harder version of level 1

  [
    '                    $          ',
    '                 $             ',
    '             $     =x          ',
    '              =x               ',
    '        $                      ',
    '         =x                    ',
    '                               ',
    '    =x                       -+',
    '              $   ^    $     ()',
    '==      xxx  =x  x=x   x    xxx',
  ],

  // LEVEL 3
  // - introduce big head and big jump

  [
    '                                     $ $     ',
    '                                    $ $ $    ',
    '                                             ',
    '==    x                             x x x    ',
    '          $                                  ',
    '              x          x                   ',
    '                   =# =                      ',
    '           x       ====       x              ',
    '            =x                               ',
    '                x         x                  ',
    '                 =x                           ',
    '                     x                       ',
    '                                             ',
    '                         x                   ',
    '                                             ',
    '                                             ',
    '                            x                ',
    '                                -+           ',
    '$                               ()           ',
    'x   x=x=xxxxx==xxxxxxxx=xx=xxxxxxx           ',
  ],

  /// MORE LEVELS HERE /// 

  // DAN'S LEVEL
  // - Steps
  // - Slide
  // - Power jump
  // - Crazy steps 
  // - Out

  [
    '                                                                                               =*=%           ',
    '                                                                                           ^                  ',
    '                 ^   ^                                                                    x=x=                ',
    '               xx=x=xxxx                                                                                      ',
    '            x=           $   $                                               *           ^                    ',
    '          =x              $              *           %                                  x=                    ',
    '       x=                  $                                      ^                  ^               $        ',
    '    =x                             =xx   =xx  x=x   x=x   =xx   xxx=x        xxxx=x=xxxx          x=x=        ',
    '  =x                      *                                                       xx                     -+   ',
    '==                     x=xx=x=x                                        =x                                ()   ',
  ],
  // DAN'S NEXT LEVEL
  // - Bigger jumps and dependency on big head

  [
    '                                                                                                                                ',
    '                                                                                                                                ',
    '             =*=%                  =*x=x                  x*=x=%                    x*=x=                    =*=x=              ',
    '                                                                                                                                ',
    '                                                                                                                                ',
    '                           $     $$  ^           $      $$  ^            $       $$  ^             $        $$  ^               ',
    '      x=x=  x=x=x=x=x    x=x=    x=x=x=x=x     =x=x     x=x=x=x=x      x=x=      x=x=x=x=x       =x=x       x=x=xx=x=           ',
    '    x                                                                                                                           ',
    '  x                                                                                                                         -+  ',
    '==                                                                                                                          ()  ',
  ],

  // this level only works if it rotates all the time
  // FINAL LEVEL (This is insane btw)

  [
    '                                                                                                            ',
    '                                                                                                            ',
    '                                                                                                            ',
    '                                                                                                            ',
    '                                                                                                            ',
    '                                                                                                            ',
    '                                                                                                            ',
    '                                                                                                          -+',
    '                                                    #                                                     ()',
    '==xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   xx',
  ],


  /* // these levels don't quite work due to bug - charcter can walk over single gaps
  [
    "											*															^					*	 	",
    "	= =	x	x	x	x	x	x	=	%	=															x	x	x	  	x	 	",
    "																							x	x	x				  		 	",
    "																																 	",
    "									*	x					*					x	x											 	",
    "								^	x	x					*																	 	",
    "				x	x	x	x	x	x						*								x	x	x	x	x					 	",
    "															*															*		 	",
    "	x	x													*														x	x	x	 	",
    "			^						*						*																	 	",
    "		x	x	x	x			x	x	x										x	x	x			x	x	x	x				 	",
    "																																 	",
    "													x	x	x	x	x													-+	 	",
    "		*										x						x							*				 	()  	",
    "	=	=	=	=	=	=			x	x	x								x	x	x			x	x	x	x	x	x	x	x	x	",
    "                                             	 								 	",
    "                                             									 	",
  ],

  [
    "											*															^					*	 	",
    "	=	=	=	=	=	=	=	=	=	%	=															=	=	=	  	=	 	",
    "																							=	=	=				  		 	",
    "																																 	",
    "									*	=					*					=	=											 	",
    "								^	=	=					*																	 	",
    "				=	=	=	=	=	=						*								=	=	=	=	=					 	",
    "															*															*		 	",
    "	=	=													*														=	=	=	 	",
    "			^						*						*																	 	",
    "		=	=	=	=			=	=	=										=	=	=			=	=	=	=				 	",
    "																																 	",
    "													=	=	=	=	=												  -+	 	",
    "		*										=						=							*				 	()  	",
    "	=	=	=	=	=	=			=	=	=								=	=	=			=	=	=	=	=	=	=	=	=	",
    "                                             	 								 	",
    "                                             									 	",
  ],

  [
    "	=	=	=	=	=	=	=			=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	",
    "								 	 																							",
    "						=																										",
    "						=				*			*			*																",
    "						=	=	=	=	=	=	=	=	=	=	=	=	=	=	=			=	=	=	=	=	=	=	=		",
    "				=																									=	=		",
    "				=			^																				*	=	=	=		",
    "				=	=	=	=	=	=	=	=	x	=	=	=			=	=	x	=	=	=		=	=	=	=	%	=		",
    "																								=						=		",
    "																							^					*	=			",
    "			=			=	=	=	=	x	=	=	=	x	=	=	=	%	=	=	=	=	=	=	=	=	=	=	=			",
    "																																",
    "		*															=				^											",
    "	=	=	=	=	x	=	=	=	=			=	=	=	x	=	=	=	=	=	=	=	=	=	=			=	=			",
    "																								=					  -+	",
    "							^									^					*			=	*					()	",
    "	=	=		 	=	=	=	=	=	x	=	=	=	=	=	=	=			=	=	=	=	=	=	=	=	=			=	",
  ],

  [
    "																																",
    "																																",
    "																		*														",
    "	=	==	=	=	=											=	=												*		",
    "						=		^			=	=		=	=					=								^		=		",
    "	%	=				=	=	=	=												=	=	=			=	=	=	=	=		",
    "																																",
    "	=																															",
    "		=	=	=			=	=	=		=													=	=							",
    "												=		=	=		=															",
    "																		=		=	=											",
    "					=	=																										",
    "	*																															",
    "	%	=																														",
    "							=	=																					 -+		",
    "	=												^								^						=		 ()		",
    "	=	=			=	=	=	=	=	=	=	=	=	=	=	=	=			=	=	=	=	=	=	=	=	=	 ==	=	",
  ],

  [
    " 						=	=		 	=	=																				",
    "								  								=										=	%	=			",
    "			=				*										=									*			^			",
    "			=	=	=	=	=	=	=	=	=	=	=				=									=	=	=	=	=		",
    "	*			=										=			=							=	=							",
    "	=				=	*	^																=									",
    "	=	=			=	=	=	=	=	=	=					*						=	=			*	*					",
    "	=	=			=	=	%							=	=	=	=			=	=					=	=					",
    "	=	=	*			=							=				=													=	=	",
    "	=	=	=			=	=			=	=	=					=															",
    "			=			=											=	=	=	=	=	=	=	=	=	=			=	=	=	",
    "		=	=			=	=							=																		",
    "		=	=					=	=	=	=	=	=	=						^	*	*	*	*	^							",
    "				=														=	=	=	=	=	=	=	=	=	=	=	=			",
    "					=	*						^	*													=	%				=	",
    "						=	=	=			=	=	=	=	=										^							",
    "								=								=	=	=	=	=	=			=	=	=	=		   		",
    "																													-+		",
    "																													()		",
    "	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=	=			=	=	=	=	=	=			=	=	=	=	",
  ],

  */

  // sarah maps
  [
    "                                                       ",
    "==                                                     ",
    "                                                       ",
    "   x=                                                  ",
    "                                                       ",
    "       x=                        $                     ",
    "                                x=  #                  ",
    "           x=               =x      x=                 ",
    "                    $   =*              x%  $          ",
    "                    x=                      =x         ",
    "                        =x              =x             ",
    "                            =x  $   =x                 ",
    "                                x%                     ",
    "                                                     -+",
    "                                                     ()",
    "x=  x=  =x  x=  x=  x=  x=  x=  x=  x=  x=  x= x= x= x=",
  ],
  
  [
    "==                                                     ",
    "    xx=                                                 ",
    "        x=                                             ",
    "            =x                                         ",
    "                  =x=x=x=*=x=x=x=x=x%=x=x=x=x=x=x=x=   ",
    "            x                                      $x  ",
    "                  ================%=================   ",
    "                  x$                                   ",
    "          x       =============%====================   ",
    "                                                  $x   ",
    "       x          =================%================   ",
    "                  x$                                   ",
    "         x        =========%=========================  ",
    "            x                                      $x  ",
    "              x   ==================================   ",
    "                  x$                                   ",
    "                  ==================================   ",
    "                                                     -+",
    "                                                     ()",
    "                                                     xx",
  ],

];