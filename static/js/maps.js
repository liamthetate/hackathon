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
    'xx =========  ==  x==x========',
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
    'xx =========  ==  x==x========',
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
    'xx =========  ==  x  x   =====',
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
    'xx      xxx  xx  x=x   x    xxx',
  ],

  // LEVEL 3
  // - introduce big head and big jump

  [
    '                                     $ $     ',
    '                                    $ $ $    ',
    '                                             ',
    'xx    x                             x x x    ',
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
    'xx                     xxxxxxxx                                        xx                                ()   ',
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
    'xx                                                                                                                          ()  ',
  ],

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
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   xx',
  ],

  [
    "											*															^					*	 	",
    "	x	x	x	x	x	x	x	x	=	%	=															x	x	x	  	x	 	",
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

]