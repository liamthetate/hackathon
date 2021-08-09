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
    '== ===x=====  =x  x==x=====x==',
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
    '== ====xx===  xx  x==x========',
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
    '== =========  ==  x  x   =====',
  ],

  // LEVEL 2
  // - harder version of level 1

  [
    '                    $          ',
    '                 $             ',
    '             $     =x          ',
    '              =x               ',
    '        $                      ',
    '         xx                    ',
    '                               ',
    '    =x                       -+',
    '              $   ^    $     ()',
    '==      xxx  xx  x=x   x    xxx',
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
    '                                             ',
    '                x         x                  ',
    '                                             ',
    '                     x                       ',
    '                                             ',
    '                         x                   ',
    '                                             ',
    '                                             ',
    '                            x                ',
    '                                -+           ',
    '$                               ()           ',
    'x   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx           ',
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
    '                 ^   ^                                                                    xxxx                ',
    '               xxxxxxxxx                                                                                      ',
    '            xx           $   $                                               *           ^                    ',
    '          xx              $              *           %                                  xx                    ',
    '       xx                  $                                      ^                  ^               $        ',
    '    xx                             xxx   xxx  xxx   xxx   xxx   xxxxx        xxxxxxxxxxx          xxxx        ',
    '  xx                      *                                                       xx                     -+   ',
    '==                     xxxxxxxx                                        xx                                ()   ',
  ],
  // DAN'S NEXT LEVEL
  // - Bigger jumps and dependency on big head

  [
    '                                                                                                                                ',
    '                                                                                                                                ',
    '             =*=%                  =*===                  =*===%                    =*===                    =*===              ',
    '                                                                                                                                ',
    '                                                                                                                                ',
    '                           $     $$  ^           $      $$  ^            $       $$  ^             $        $$  ^               ',
    '      xxxx  xxxxxxxxx    xxxx    xxxxxxxxx     xxxx     xxxxxxxxx      xxxx      xxxxxxxxx       xxxx       xxxxxxxxx           ',
    '    x                                                                                                                           ',
    '  x                                                                                                                         -+  ',
    '==                                                                                                                          ()  ',
  ],

  /* this level only works if it rotates all the time
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
/* 

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
    "   xx                                                  ",
    "                                                       ",
    "       xx                        $                     ",
    "                                xx  #                  ",
    "           xx               xx      xx                 ",
    "                    $   =*              x%  $          ",
    "                    xx                      xx         ",
    "                        xx              xx             ",
    "                            xx  $   xx                 ",
    "                                x%                     ",
    "                                                     -+",
    "                                                     ()",
    "xx  xx  xx  xx  xx  xx  xx  xx  xx  xx  xx  xx xx xx xx",
  ],
  
  [
    "==                                                     ",
    "    xx                                                 ",
    "        xx                                             ",
    "            xx                                         ",
    "                  xxxxxx=*xxxxxxxxxx%xxxxxxxxxxxxxxx   ",
    "            x                                      $x  ",
    "                  xxxxxxxxxxxxxxxxxxxx%xxxxxxxxxxxxx   ",
    "                  x$                                   ",
    "          x       xxxxxxxxxxxxx%xxxxxxxxxxxxxxxxxxxx   ",
    "                                                  $x   ",
    "       x          xxxxxxxxxxxxxxxxxxxx%xxxxxxxxxxxxx   ",
    "                  x$                                   ",
    "         x        xxxxxxxxx%xxxxxxxxxxxxxxxxxxxxxxxx   ",
    "            x                                      $x  ",
    "              x   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   ",
    "                  x$                                   ",
    "                  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   ",
    "                                                     -+",
    "                                                     ()",
    "                                                     xx",
  ],

];
