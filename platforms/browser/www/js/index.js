
var app = {
    // Application varructor
    initialize: function() { 
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        ons.disableAutoStyling()
        ons.platform.select('ios')
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // StatusBar.backgroundColorByName('purple')

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // console.log(id)
    },
};

app.get_categories = function(){
    var data = app.content
    if (data){
        // var categordata[0]
        var categories_list = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            // console.log(data[i]);
            categories_list += '<div class="category_wrapper"><ons-card  data-category-id="'+category.id+'" data-category-name="'+category.name+'"" ><img src="'+category.icon+'">'+ category.name +'</ons-card></div>'
        }
        $('#categories_wrapper').html(categories_list)
    } else {
        $('#categories_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.get_featured = function(){
    var data = app.content
    if (data){
        // var categordata[0]
        var featured_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            
            for (let x = 0; x < category.topics.length; x++) {
                const topic = category.topics[x];
                if(topic.featured == true){
                    featured_html += '<div class="topic_wrapper"><ons-card data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                    // console.log(featured_html);
                }
            }
        }
        $('#featured_wrapper').html(featured_html)
    } else {
        $('#featured_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.get_category_topics = function(category_id){
    var data = app.content
    // console.log(category_id)
    if (data){
        // console.log('h   ere is what we need')
        // console.log(data)
        // var categordata[0]
        var topics_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            if( category.id == category_id){
                for (let x = 0; x < category.topics.length; x++) {
                    const topic = category.topics[x]; 
                    if(topic.color){
                        if (topic.parent_topic){
                            topics_html += '<div  class="topic_wrapper parent_topic" ><ons-card style=" color:white;background:'+topic.color+'" data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        } else {
                            topics_html += '<div  class="topic_wrapper" ><ons-card style=" color:white;background:'+topic.color+'" data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        }
                        // console.log(topic.color)
                    } else {
                        if (topic.parent_topic){
                            topics_html += '<div class="topic_wrapper parent_topic" ><ons-card data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        } else {
                            topics_html += '<div class="topic_wrapper" ><ons-card data-category-id="'+category_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+ topic.title +'</ons-card></div>'
                        }
                    }        
                }    
            }
        }
        // console.log(topics_html)
        $('#category .topics_wrapper').html(topics_html)
    } else {
        $('#category .topics_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
//////////

app.get_topic_content = function(params){
    var self = this
    // console.log('here we start')
    var data = self.content
    var category_id = params.category_id
    var parent_topic_id = params.parent_topic_id
    var topic_id = params.topic_id
    if (data){
        // var categordata[0]
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            if ( category.id == category_id){
                if ( parent_topic_id != undefined){
                    for (let pt = 0; pt < category.topics.length; pt++) {
                        const parent_topic = category.topics[pt];
                        if (parent_topic.id == parent_topic_id){
                            for (let t = 0; t < parent_topic.child_topics.length; t++) {
                                const topic = parent_topic.child_topics[t];
                                if (topic.id == topic_id){
                                    var content_html = ''
                                    // console.log(child_topic.pages)
                                    self.active_topic = {'id':topic.id,'title':topic.title,'parent_topic':parent_topic_id}
                                    if(topic.pages.length > 1){
                                        self.active_topic.pages = topic.pages
                                        content_html += self.active_topic.pages[0].content
                                        // console.log(content_html)
                                        $('#topic .content_wrapper').html(content_html)
                                        self.active_page_number = 0
                                        $('#topic .page__content').append('<div class="topic_nav_wrapper"><div class="nav_btn_wrapper"><div class="topic_nav_btn prev hidden">السابق</div></div><div class="nav_btn_wrapper"><div class="topic_nav_btn next">التالي</div></div> </div>')    
                                    } else{
                                        // content_html += 'nothing found'
                                        self.active_topic.pages = topic.pages
                                        content_html += self.active_topic.pages[0].content
                                        // console.log(content_html)
                                        $('#topic .content_wrapper').html(content_html)
                                        self.active_page_number = 0
                                        $('#topic .content_wrapper').html(content_html)
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (let t = 0; t < category.topics.length; t++) {
                        const topic = category.topics[t];
                        if (topic.id == topic_id){
                            var content_html = ''
                            // console.log(child_topic.pages)
                            self.active_topic = {'id':topic.id,'title':topic.title}
                            if(topic.pages.length > 1){
                                console.log(topic.pages.length)
                                self.active_topic.pages = topic.pages
                                content_html += self.active_topic.pages[0].content
                                // console.log(content_html)
                                $('#topic .content_wrapper').html(content_html)
                                self.active_page_number = 0
                                $('#topic .page__content').append('<div class="topic_nav_wrapper"><div class="nav_btn_wrapper"><div class="topic_nav_btn prev hidden">السابق</div></div><div class="nav_btn_wrapper"><div class="topic_nav_btn next">التالي</div></div> </div>')    
                            } else{
                                // content_html += 'nothing found'
                                self.active_topic.pages = topic.pages
                                content_html += self.active_topic.pages[0].content
                                // console.log(content_html)
                                $('#topic .content_wrapper').html(content_html)
                                self.active_page_number = 0
                                $('#topic .content_wrapper').html(content_html)
                            }    
                        }
                    }
                }
            }
        }
        // console.log(content_html)
    } else {
        $('#topic .content_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.get_child_topic_content = function(parent_id,child_topic_id){
    var self = this
    // console.log('here we start')
    var data = self.content
    if (data){
        // var categordata[0]
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            for (let x = 0; x < category.topics.length; x++) {
                const parent_topic = category.topics[x];
                if( parent_topic.id == parent_id){
                    if (parent_topic.parent_topic){
                        for (let i = 0; i < parent_topic.child_topics.length; i++) {
                            const child_topic = parent_topic.child_topics.length[i];                       
                        
                            if(child_topic.id == child_topic_id){
                                var content_html = ''
                                // console.log(child_topic.pages)
                                self.active_topic = {'id':child_topic.id,'title':child_topic.title,'parent_topic':child_topic.parent_topic,'child_topics':child_topic.child_topics}
                                    if(child_topic.pages.length > 1){
                                        self.active_topic.pages = child_topic.pages
                                        content_html += self.active_topic.pages[0].content
                                        // console.log(content_html)
                                        $('#topic .content_wrapper').html(content_html)
                                        self.active_page_number = 0
                                        $('#topic .page__content').append('<div class="topic_nav_wrapper"><div class="nav_btn_wrapper"><div class="topic_nav_btn prev hidden">السابق</div></div><div class="nav_btn_wrapper"><div class="topic_nav_btn next">التالي</div></div> </div>')    
                                    } else{
                                        // content_html += 'nothing found'
                                        self.active_topic.pages = child_topic.pages
                                        content_html += self.active_topic.pages[0].content
                                        // console.log(content_html)
                                        $('#topic .content_wrapper').html(content_html)
                                        self.active_page_number = 0
                                        $('#topic .content_wrapper').html(content_html)
                                    }    
                            }
                        }
                    } else {
                            // console.log(topic)
                            // console.log(topic.pages)
                            // console.log(topic)
                            var content_html = ''
                            self.active_topic = {'id':topic.id,'title':topic.title,'parent_topic':topic.parent_topic,'child_topics':topic.child_topics}
                            // console.log(self.active_topic)
                            if (!self.active_topic.parent_topic){
                                if(topic.pages.length > 1){
                                    console.log('we have pages')
                                    // console.log(topic.pages)
                                    self.active_topic.pages = topic.pages
                                    // console.log(self.active_topic.pages)
                                    // for (let i = 0; i < topic.pages.length; i++) {
                                    //     const page = topic.pages[i];
                                    //     self.active_topic.pages.push({'page_id': page.id, 'page_content': page.content})
                                    // }
                                    content_html += self.active_topic.pages[0].content
                                    // console.log(content_html)
                                    $('#topic .content_wrapper').html(content_html)
                                    self.active_page_number = 0
                                    $('#topic .page__content').append('<div class="topic_nav_wrapper"><div class="nav_btn_wrapper"><div class="topic_nav_btn prev hidden">السابق</div></div><div class="nav_btn_wrapper"><div class="topic_nav_btn next">التالي</div></div> </div>')    
                                } else{
                                    // console.log('we have pages')
                                    // console.log(topic.pages)
                                    self.active_topic.pages = topic.pages
                                    // console.log(self.active_topic.pages)
                                    // for (let i = 0; i < topic.pages.length; i++) {
                                    //     const page = topic.pages[i];
                                    //     self.active_topic.pages.push({'page_id': page.id, 'page_content': page.content})
                                    // }
                                    content_html += self.active_topic.pages[0].content
                                    // console.log(content_html)
                                    $('#topic .content_wrapper').html(content_html)
                                    self.active_page_number = 0
                                }    
                            } else {
                                for (let i = 0; i < self.active_topic.child_topics.length; i++) {
                                    const topic = self.active_topic.child_topics[i];
                                    
                                }
                            }
                    }
                }
                // console.log(content_html)
            }
        }
        // console.log(content_html)
    } else {
        $('#topic .content_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }
}
app.click_topic_next_page = function(){
    // var content_html = app.cont
    if (app.active_topic.pages.length > 1){
        app.active_page_number =  app.active_page_number + 1
        if(app.active_topic.pages.length == app.active_page_number + 1){
            $('.topic_nav_btn.next').addClass('hidden')
            $('.topic_nav_btn.prev').removeClass('hidden')
        } else {
            $('.topic_nav_btn.prev').removeClass('hidden')
        }
        var content = app.active_topic.pages[app.active_page_number].content
        // console.log(content)
        $('#topic .content_wrapper').html(content)    
    }
}
app.click_topic_prev_page = function(){
    app.active_page_number =  app.active_page_number - 1
    if(app.active_page_number == 0){
        $('.topic_nav_btn.prev').addClass('hidden')
        $('.topic_nav_btn.next').removeClass('hidden')
    } else {
        $('.topic_nav_btn.next').removeClass('hidden')
    }
    var content = app.active_topic.pages[app.active_page_number].content
    $('#topic .content_wrapper').html(content)
}

app.get_search = function(txt_search) {
    if(txt_search != ''){
        var topics_html = ''
        // app.content.array.forEach(element => {
            
        // });
        app.content.forEach(function(category){
            category.topics.forEach(function(topic){
                if (topic.title.toLowerCase().includes(txt_search.toLowerCase()) ){
                    topics_html += '<div class="topic_wrapper" ><ons-card data-topic-id="'+topic.id+'" data-topic-title="'+topic.title+'">'+topic.title+'</ons-card></div>'
                }
            })
        })
        $('#search_wrapper').html(topics_html)
        $('#categories_wrapper').hide()
        $('#featured_wrapper').hide()
        $('#search_wrapper').show()    
    } else {
        $('#search_wrapper').hide() 
        $('#categories_wrapper').show()
        $('#featured_wrapper').show()
    }

}

///////////////


// Main Logic 
app.initialize = (function(_super) {
    return function() {
        // New Code
        // Mainly we define event listeners
            $(document).on('click', '.topic_nav_btn.next', app.click_topic_next_page)
            $(document).on('click', '.topic_nav_btn.prev', app.click_topic_prev_page)
            document.addEventListener('init', function(event) {
                if (event.target.matches('#main')) {
                    app.get_categories()
                    app.get_featured()
                    $(document).on('click', '.category_wrapper', function(e){
                        e.stopImmediatePropagation()
                            ekbNav.pushPage('category.html',{
                                data: {
                                  category_id: $(this).find('ons-card').attr('data-category-id'),
                                  category_name: $(this).find('ons-card').attr('data-category-name'),
                                  title: $(this).find('ons-card').attr('data-category-name')
                                },
                            })
                    })
                    $(document).on('input','.search',function(e){
                            var el = e.target
                            var txt_search = $(el).val()
                            app.get_search(txt_search)
                    });
                }
            }, false);
    
        // End of new code
        return _super.apply(this, arguments);
    };         
})(app.initialize);

app.onDeviceReady = (function(_super) {
    return function() {
        // New Code
        // define all cordova related events
        // document.addEventListener('init', function(event) {
        //     if (event.target.matches('#topic')) {
        //         var topic_id = ekbNav.topPage.data.id
        //         var topic_title = ekbNav.topPage.data.title
        //         $('#topic .toolbar__title').html(topic_title)
        //         app.get_topic_content(topic_id)
        //     }
        // }, false);

        // End of new code
        return _super.apply(this, arguments);
    };         

})(app.onDeviceReady);

app.get_child_topics = function(category_id, topic_id){
    var data = app.content
    // console.log(category_id)
    if (data){
        // console.log('h   ere is what we need')
        // console.log(data)
        // var categordata[0]
        var topics_html = ''
        for (var i = 0; i < data.length; i++) {
            var category = data[i];
            if( category.id == category_id){
                for (let x = 0; x < category.topics.length; x++) {
                    const topic = category.topics[x]; 
                    if (topic.id == topic_id){
                        for (let i = 0; i < topic.child_topics.length; i++) {
                            const child_topic = topic.child_topics[i];
                            if(child_topic.color){
                                    topics_html += '<div  class="topic_wrapper" ><ons-card style=" color:white;background:'+child_topic.color+'"  data-category-id="'+category_id+'" data-parent-topic-id="'+topic_id+'" data-topic-id="'+child_topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
                                // console.log(topic.color)
                            } else {
                                    topics_html += '<div class="topic_wrapper" ><ons-card  data-category-id="'+category_id+'" data-parent-topic-id="'+topic_id+'" data-topic-id="'+topic.id+'" data-topic-title="'+child_topic.title+'">'+ child_topic.title +'</ons-card></div>'
                            }       
                        }
                    }
                }    
            }
        }
        // console.log(topics_html)
        $('#parent_topic .topics_wrapper').html(topics_html)
    } else {
        $('#parent_topic .topics_wrapper').html('<div class="no_results">Sorry, No results found</div>')
    }

}
// // Category Logic
app.onDeviceReady = (function(_super) {
    return function() {
        // New Code
        // define all cordova related events
        document.addEventListener('init', function(event) {
            if (event.target.matches('#category')) {
                // console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var category_name = ekbNav.topPage.data.category_name
                $('#category .toolbar__title').html(category_name)
                app.get_category_topics(category_id)
            }
        }, false);
        document.addEventListener('init', function(event) {
            if (event.target.matches('#parent_topic')) {
                // console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var topic_id = ekbNav.topPage.data.id
                var title = ekbNav.topPage.data.title
                $('#parent_topic .toolbar__title').html(title)
                app.get_child_topics(category_id, topic_id)
            }
        }, false);
        document.addEventListener('init', function(event) {
            if (event.target.matches('#topic')) {
                // console.log(ekbNav.topPage.data.category_name)
                var category_id = ekbNav.topPage.data.category_id
                var parent_topic_id = ekbNav.topPage.data.parent_topic_id
                var topic_id = ekbNav.topPage.data.id
                var title = ekbNav.topPage.data.title
                $('#topic .toolbar__title').html(title)
                var params = {
                    category_id : category_id,
                    parent_topic_id : parent_topic_id,
                    topic_id : topic_id 
                }
                console.log(params)
                app.get_topic_content(params)
            }
        }, false);        
        $(document).on('click','.topic_wrapper', function(){
            if($(this).hasClass('parent_topic')){
                ekbNav.pushPage('parent_topic.html',
                {
                    data: {
                      id: $(this).find('ons-card').attr('data-topic-id'),
                      title: $(this).find('ons-card').attr('data-topic-title'),
                      category_id: $(this).find('ons-card').attr('data-category-id'),
                    }
                })
                // console.log($(this).find('ons-card').attr('data-topic-title'))
            } else {
                ekbNav.pushPage('topic.html',{
                    data:{
                        id: $(this).find('ons-card').attr('data-topic-id'),
                        title: $(this).find('ons-card').attr('data-topic-title'),
                        category_id: $(this).find('ons-card').attr('data-category-id'),
                        parent_topic_id:$(this).find('ons-card').attr('data-parent-topic-id'),
                    }
                })
                // console.log($(this).find('ons-card').attr('data-topic-title'))
            }
        })

        // End of new code
        return _super.apply(this, arguments);
    };         

})(app.onDeviceReady);


// // Topic Logic 
app.initialize = (function(_super) {
    return function() {
        // New Code
            $(document).on('click', '.back_btn', function(){
                ekbNav.popPage()
            })
        // End of new code
        return _super.apply(this, arguments);
    };         
})(app.initialize);
app.images = [
    {
        topic_id: 1,
        img: [
            'img/imgs/registeration.PNG',
            'img/imgs/newuser.png',
            'img/imgs/newaccount.png',
            'img/imgs/newaccount2.png',
            'img/imgs/conditions.png',
            'img/imgs/login.png',
            'img/imgs/mail.png',
            'img/imgs/register0.PNG',
            'img/imgs/success.png',
            'img/imgs/confirm.png',

        ]
    },{
        topic_id: 2,
        img: [
            'img/imgs/simplesearch.png',
            'img/imgs/searchresult.png',
            'img/imgs/searchresult2.png',
            'img/imgs/energy.png',
            'img/imgs/searchresource',
            'img/imgs/resource.png',
            'img/imgs/key.png',
            'img/imgs/keyword.png',
            'img/imgs/sharenobile.png',
            'img/imgs/sharetweet.png'

              ]
    },{
        topic_id: 3,
        img: [
            'img/imgs/discoveryeducate.png',
            'img/imgs/discovery1.png',
            'img/imgs/discovery2.png',
            'img/imgs/video.png',
            'img/imgs/share.png',
            'img/imgs/webEdTV.png',
            'img/imgs/primary.png',
            'img/imgs/date.png',
            'img/imgs/searchvideo.png',
            'img/imgs/searchvideo2.png',
            'img/imgs/curriclum.png',
            'img/imgs/prim.png',
            'img/imgs/prim6.png',
            'img/imgs/primvideo.png',
            'img/imgs/primresource.png',
            'img/imgs/math.png',
            'img/imgs/guide.png',
            'img/imgs/den.png',
            'img/imgs/pdf.png',
            'img/imgs/tool2.png',
            'img/imgs/briticana.png',
            'img/imgs/briticanalevel.png',
            'img/imgs/student.png',
            'img/imgs/student2.png',
            'img/imgs/educator.png',
            'img/imgs/register.png',
            'img/imgs/middle1.png',
            'img/imgs/middle2.png',
            'img/imgs/compare.png',
            'img/imgs/solar.PNG',
            'img/imgs/gender.png',
            'img/imgs/discovery3.png',
            'img/imgs/discovery4.png',
            'img/imgs/machine1.png',
            'img/imgs/machine2.png',
            'img/imgs/machine3.png',
            'img/imgs/sum1.png',
            'img/imgs/energy1.png',
            'img/imgs/strategies1.PNG',
            'img/imgs/strategies2.PNG',
            'img/imgs/strategies3.PNG',
            'img/imgs/spageti.png',
            'img/imgs/den1.png',
            'img/imgs/den2.png',
            'img/imgs/den3.png',
            'img/imgs/den4.png',
            'img/imgs/den5.png',
            'img/imgs/den6.png',
            'img/imgs/den7.png',
            'img/imgs/den8.png',
            'img/imgs/briticanainto.PNG',
            'img/imgs/middleintro.png',
            'img/imgs/compare1.png',
            'img/imgs/solar1.png',
            'img/imgs/solar2.png',
            'img/imgs/solar3.png',
            'img/imgs/solar4.png',
            'img/imgs/solar5.png',
            'img/imgs/solar6.png',
            'img/imgs/browse1.png',
            'img/imgs/imgquest.PNG',
            'img/imgs/imgquest1.PNG',
            'img/imgs/imgquest2.PNG',
            'img/imgs/ebook.png',
            'img/imgs/ebook1.png',
            'img/imgs/high.png',
            'img/imgs/high1.png',
  ]
    },{
        topic_id: 4,
        img: [
            'img/imgs/teachergate.png',         
        ]
    },{
        topic_id: 5,
        img: [
            'img/imgs/childrengate.png'
         
        ]
    },{
        topic_id: 6,
        img: [
            'img/imgs/research.png'
        ]
    }
    ,{
        topic_id: 7,
        img: [
            'img/imgs/readers.png'
        ]
    },{
        topic_id: 7,
        img: [
            'img/imgs/library.png',
            'img/imgs/searchlibrabry.png',
            'img/imgs/loginlib.png',
            'img/imgs/library2.png',
            'img/imgs/advanced.png',
            'img/imgs/advanced1.png',
            'img/imgs/advanced2.png',
            'img/imgs/advanced3.png',
            'img/imgs/advanced4.png',
            'img/imgs/advanced5.png',
            'img/imgs/advanced6.png',
            'img/imgs/advanced7.png',
            'img/imgs/advanced8.png',
            'img/imgs/tree.png',
        ]
    },{
        topic_id: 8,
        img: [
            'img/imgs/atomic.png',
            'img/imgs/createnewaccount1.png',
            'img/imgs/createnewaccount.png',
            'img/imgs/user.png',
            'img/imgs/browse.png',
            'img/imgs/microsoft.png',
            'img/imgs/course1.png', 
            'img/imgs/course2.png',
            'img/imgs/details.png',
            'img/imgs/power.png',
            'img/imgs/list.png',
            'img/imgs/certificate.png',
            'img/imgs/videos.png',
            'img/imgs/power1.png',
            'img/imgs/sass.png',
            'img/imgs/certificate1.png',
            'img/imgs/scientific.png',
            'img/imgs/magazine.png',
            'img/imgs/scientificintro.png',
            'img/imgs/science.png',
            'img/imgs/science1.png',
            'img/imgs/nashra.png',
            'img/imgs/nashra1.png',
            'img/imgs/confirmemail.png'
        ]
    },{
        topic_id: 9,
        img: [
            'img/mebooks.png',
            'img/mebooksstore.png',
        ]
    }
    ,{
        topic_id: 10,
        img: [
            'img/imgs/chemistry.PNG',
            'img/imgs/chemistry1.png',
            'img/imgs/chemistry2.png',
            'img/imgs/table.png',
            'img/imgs/manzoma.png',
            'img/imgs/search.png',
            'img/imgs/mebooks.png',
            'img/imgs/mebooks1.png',
            'img/imgs/mobile.png',
            'img/imgs/mobile1.png',
            'img/imgs/book.png',
            'img/imgs/floppy.png',
            'img/imgs/open.png',
            'img/imgs/bookonline.png',
            'img/imgs/mebooksandroid.png',
            'img/imgs/registeronline.png',
            'img/imgs/chemistryintro.png',
            'img/imgs/chemistrydb.png'

              ]
    },{
        topic_id: 11,
        img: [
            'img/imgs/chemistry.PNG',
            'img/imgs/click.png',
            'img/imgs/click1.png',
            '/img/imgs/clickintro.png',

                ]
    },{
        topic_id: 12,
        img: [
            'img/imgs/national1.png',
            'img/imgs/national2.png',
            'img/imgs/national3.png',
            'img/imgs/national4.png',
            'img/imgs/national5.png',
            'img/imgs/manzoma1.png',
            'img/imgs/manzoma2.png',
            'img/imgs/manzoma3.png',
            'img/imgs/manzoma4.png',
            'img/imgs/national6.png',
    ]
    },
    {
        topic_id: 13,
        img: [
            'img/imgs/nationl.png',
        ]
    }
];

app.content = [
            {
                id:1,
                name:'بنك المعرفه',
                icon:"img/undraw_online_test_gba7.svg",
                topics:[
                    {
                        id:1,
                        title:'نبذه عن بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; نبذه عن بنك المعرفه</strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">نحو مجتمع مصري &quot;يتعلم ويفكر ويبتكر &quot; هى المبادرة التى أطلقها الرئيس عبدالفتاح السيسى خلال عيد العلم عام 2014 . ومن خلالها بدأت المجالس التخصصيه التابعة لرئاسه الجمهورية فى محاولات اطلاق مشروعات قوميه تهتم بتنميه التعلم وطرح حلول لعلاج هذه المشكله .</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وبفضل ايمان القياده السياسيه بأهميه التعليم لغد أفضل جاءت مبادرات رئاسة الجمهورية باطلاق المشروعات القومية كمشروع تأهيل وتدريب المعلم</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">يعد مشروع &quot;بنك المعرفه المصري&quot; أكبر مصادر المعرفة على الانترنت داخل مصر حيث يعطى الطلاب والمعلمين والباحثين فرصة الحصول على موارد مجانية للتعليم والأبحاث العلميه من جميع أنحاء العالم </span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">وهو عباره عن بوابه رقميه على الويب ومنفذ مرتبط بمعظم المصادر العالمية للتعليم والثقافه والمعرفة من خلال اتفاقيات شراكه دوليه وهو قناة رسميه تفتح لك جميع المصادر هذه بدون أدنى اشتراكات مالية ، فقط لمجرد تسجيلك بالبنك ، لذا أطلق عليه مشروع قومى لخدمة الشعب المصرى فلا يتاح الدخول على الموقع أو التسجيل به والأستفاده بخدماته الا من داخل الأراضى المصرية. (مخصص فقط لحاملى الجنسية المصرية ويشترط أن يكونوا على أراضى البلد )</span></li> </ul>',
                            }
                        ]
                    },   {
                        id:2,
                        title:'إنشاء حساب على بنك المعرفه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>كيف أسجل ببنك المعرفة واستفيد منه ؟</strong></em></span></p><img class="content_image" src="'+ app.images[0].img[7] +'"> <p dir="rtl"><span style="font-size:16px">1- اختر بوابة من البوابات الأربع التى تريدها كمستخدم للبنك (قارئ عام -معلم أو مدرس أو طالب جامعى - باحث أكاديمى جامعى - طفل)</span></p><img class="content_image" src="'+ app.images[0].img[0] +'"><p dir="rtl"></p>فى حاله نوع المستخدم(معلم) يتم الضغط على بوابه الطلاب والمعلمون <img class="content_image" src="'+ app.images[0].img[1] +'"> ',
                            },{
                                id:2,
                                content:'<p dir="rtl"><span style="font-size:16px">2-قم بكتابه&nbsp; بياناتك المطلوبه (بريدك الألكترونى - رقمك القومى -ادارتك التعليميه فى حال المعلم + المنطقه أى المديرية التعليميه فى حال المعلم - المدرسه)</span></p><img class="content_image" src="'+ app.images[0].img[2] +'"><p></p><img class="content_image" src="'+ app.images[0].img[3] +'"><p></p><img class="content_image" src="'+ app.images[0].img[4] +'">',
                            },{
                                id:3,
                                content:'<p></p><img class="content_image" src="'+ app.images[0].img[8] +'"></p><p><img class="content_image" src="'+ app.images[0].img[9] +'"><p dir="rtl"><span style="font-size:16px">3- الباحثيين الأكاديميين &quot;أى العاملين بالجامعات والكليات من الآساتذه وأعضاء هيئه التدريس ، لا يسمح لهم بالتسجيل الا من داخل الجامعه ذاتها وخط الانترنت بها ، ثم بعد ذلك يمكنهم الدخول من أى مكان بالجمهورية &quot;&nbsp;</span></p>',
                            }

                        ]
                    },{
                        id:3,
                        title:'الدخول على بنك المعرفة',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<ul dir="rtl"> <li><span style="font-size:16px">أولا يتم الدخول على بنك المعرفه بكلمه المرور التى يتم ارسالها للمستخدم عبر البريد الالكترونى.</span></pre> </li></br> <li><span style="font-size:16px">ثانيا أدخل كلمه مرور جديده كما فى الجزء رقم (2)</span></li> </ul><img class="content_image" src="'+ app.images[0].img[5] +'"><p></p><ul dir="rtl"> <li> <span style="font-size:16px">بعد ذلك يتم الدخول على بنك المعرفه من خلال عنوان البريد الالكترونى الخاص بك وكلمه المرور بعد تغيرها كما فى النافذه التاليه </span></pre> </li> </ul><img class="content_image" src="'+ app.images[0].img[6] +'">',
                            }
                        ]
                    }
                ],
        

            },{
                id:2,
                name:'محرك البحث الأكاديمي',
                icon:"img/undraw_Web_search_re_efla.svg",
                topics:[
                    {
                        id:4,
                        title:'كيفيه استخدام محرك البحث',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<ul> <li dir="rtl" style="text-align:right"><span style="font-size:16px"><strong>يوجد هناك نوعان من البحث&nbsp;</strong></span></li> </ul> <p dir="rtl" style="text-align:right">أولا البحث البسيط نكتب فى شريط البحث <strong>ancient Egypt</strong></p><img class="content_image" src="'+ app.images[1].img[0] +'"><p dir="rtl" style="text-align:right"><span style="text-align:right">بالضغط على <strong>Enter</strong> تظهر النتيجه كما فى النافذه التاليه</span></p><img class="content_image" src="'+ app.images[1].img[1] +'">',
                            },{
                                id:2,
                                content:'<p dir="rtl" style="text-align:right">ثانيا البحث المتقدم نكتب فى شريط البحث <strong>الطاقه </strong>ثم نضغط على بحث متقدم</p><img class="content_image" src="'+ app.images[1].img[3] +'"><p dir="rtl" style="text-align:right">بالضغط على <strong>Enter</strong> تظهر النتيجه كما فى النافذه التاليه</p><img class="content_image" src="'+ app.images[1].img[2] +'">'
                            },{
                                id:3,
                                content:'<p dir="rtl" style="text-align:right">تظهر نتيجه البحث وهى تحتوى على جميع المصادر التى بها عنوان البحث يمكن التحكم فى نتائج البحث من حيث اختيار مصادر معينة</p><img class="content_image" src="'+ app.images[1].img[5] +'"><p dir="rtl" style="text-align:right">يمكن تحديد البحث فى مجلات معينه يحددها الباحث كما فى النافذه التاليه</p><img class="content_image" src="'+ app.images[1].img[6] +'">'
                            },{
                                id:4,
                                content:'<p dir="rtl" style="text-align:right">نستطيع من خلال البحث المتقدم البحث عن طريق الكلمه المفتاحيه أو المؤلف أو العنوان أو الموضوع أو الوصف&nbsp;</p><img class="content_image" src="'+ app.images[1].img[7] +'"><p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند اختيار &nbsp;المقال الأول لنتيجة البحث عن الطاقة تظهر النافذة التالية&nbsp;ويتاح من خلالها أمكانية ارسال المقال بأكثر من طريقة لصديق مثل&nbsp; الفيس او البريد الالكتروني أو تويتر ..... وكذلك امكانية عرض المقال باللغة الانجليزية و امكانية&nbsp; طباعة المقال</span></span></span></p><img class="content_image" src="'+ app.images[1].img[8] +'">',
                            },{
                                id:5,
                                content:'<p dir="RTL" style="text-align:right"><span style="font-family:Arial, sans-serif"><span style="font-size:14.6667px">توضح النافذه التاليه كيفيه ارسال المقال لصديق عبر البريد الالكترونى&nbsp;</span></span></p><img class="content_image" src="'+ app.images[1].img[9] +'">',
                            }
                        

                        ]
                    }
                ],
            },{
                id:3,
                name:'المصادر',
                icon:"img/undraw_online_articles_79ff.svg",
                topics:[
                    {
                        id:5,
                        title:' Discovery Education',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:' الرئيسيه',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<p dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">المصدر </span><strong>Discovery education</strong> <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;يوفر محتوى&nbsp; تعليمي مناسب للمناهج الدراسية للمراحل التعليمية المختلفة ( ابتدائي - اعدادي - ثانوی )</span></span></span></p><img class="content_image" src="'+ app.images[2].img[0] +'"><p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">للبحث نذهب الى مربع النص أعلى النافذة ثم نقوم بكتابة اي عنوان &nbsp;تريد البحث &nbsp;عنه مثلا </span>&nbsp;&nbsp;&nbsp;scarecrow <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ثم الضغط على بحث لتظهر</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;نتائج البحث كما يوجد امكانية لفرز النتائج علي حسب المرحلة الدراسية أو&nbsp; نوع المورد سواء كان مقطع فيديو أو فيديو أو صورة </span></span></p><img class="content_image" src="'+ app.images[2].img[1] +'">',
                                    },{
                                        id:2,
                                        content:'<p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند الضغط على احدى &nbsp;نتائج البحث سوف يقوم بعرض الفيديو من نتيجة البحث المختار</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> </span></span></p><img class="content_image" src="'+ app.images[2].img[3] +'"><p dir="RTL" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">كما انه يمكن مشاركة الفيديو على &nbsp;مواقع التواصل الاجتماعى او ارساله عبر الميل </span></span></p><img class="content_image" src="'+ app.images[2].img[4] +'">',

                                    },{
                                        id:3,
                                        content:'<p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">مثال أخر: يمكن البحث عن الجهاز الهضمى كما هو موضح فى الشاشات التاليه</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> </span></span></p><img class="content_image" src="'+ app.images[2].img[33] +'"></br><img class="content_image" src="'+ app.images[2].img[34] +'"></br><img class="content_image" src="'+ app.images[2].img[35] +'">',
                                    },{
                                        id:4,
                                        content:'<img class="content_image" src="'+ app.images[2].img[35] +'">',

                                    }
                                ],
                                featured:false,
                            },
                            {
                                id:6,          
                                title:' WebEdTV',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">توفر شبكة </span></span><strong><span style="font-size:11.0pt"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">WebEdTV</span></span></strong><span dir="RTL" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> للمدرسين ، والأباء ، والطلاب مجموعة منتقاة من أفضل الموارد المعلوماتية الشيقة من مجموعة مقاطع الفيديو ذات المستوى العالمي من إنتاج <strong>Discovery Education</strong></span></span></h1> </li> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ويتم انتقاء الموارد بعناية لتتلاءم مع موضوعات المناهج الدراسية لطلاب المراحل الابتدائية ، والإعدادية ، والثانوية في كل أسبوع ، هي عبارة عن قناة تليفزيونية يتم بثها يوميا عبر الانترنت من الأحد إلى الخميس لمدة ثلاثة ساعات تقدم مجموعة الفيديوهات التعليمية للمراحل الإبتدائية والاعدادية والثانوية.</span></span></h1> </li> </ul>',
                                    },
                                    {
                                        id:2,
                                        content:'<ul dir="rtl"> <li><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">جميع الفيديوهات يتم اعادة عرضها يوم السبت يتم اختيار موارد في خمس مواد ، هي : العلوم والرياضيات ، ومهن </span></span><span style="font-size:11.0pt"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">STEM</span></span><span dir="RTL" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> ، ومهارات القرن الحادي والعشرين ، والموضوعات العالمية ، بالإضافة إلى مقاطع فيديو تمهيدية مخصصة ، واستراتيجيات تدريس و أدلة تعلم لإثارة الفضول ودعم التعلم في المدرسة أو في المنزل </span></span></li> </ul><img class="content_image" src="'+ app.images[2].img[5] +'">',
                                    },{
                                        id:3,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">الان قم باختيار المرحلة التي تناسبك&nbsp;وليكن الابتدائية</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[6] +'"><ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ثم تحديد تاريخ البث والمادة العلمية الرياضيات &nbsp;ثم اختيار فيديو من نتائح العرض</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[7] +'">',
                                    },{
                                        id:4,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-family:Arial, sans-serif"><span style="font-size:14.6667px"><em>وكذلك المرحله الثانويه لتكون النتائج التاليه</em></span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[8] +'"><p></p><img class="content_image" src="'+ app.images[2].img[9] +'">'
                                    }
                        

                                ],
                                featured:false,
                            }, 
                            {
                                id:7,          
                                title:' Curriculum Connect',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">استخدام </span><strong>Curriculum Connect</strong><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> وهو ربط المنهج المصري بمحتوى رقمي ممتع . فلم يعد المعلمون بحاجة للبحت على نطاق واسع عن موارد رقمية لدعم دروسهم ويمكن للطلاب دراستها.</span></span></span></h1> </li> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يوفر </span><strong>Curriculum Connect</strong><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> الوصول عبر الإنترنت وعبر الهاتف المحمول إلى الآلاف من مقاطع الفيديو ، والمقالات النصية ، والعروض التفاعلية ، وملفات الصوت والصور المدققة التي تم تعيينها إلى كل دروس العلوم والرياضيات لجميع المراحل الدراسية الابتدائي - الإعدادي &ndash; الثانوي.</span></span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[10] +'">',
                                    },
                                    {
                                        id:2,
                                        content:' <ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نختار المرحلة وليكن الابتدائى</span></span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[11] +'"><ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نبحث في مادة العلوم للصف الثالث الابتدائى الفصل الأول وحده 1 لتظهر النافذة التالية&nbsp; </span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[12] +'">',
                                    },{
                                        id:3,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن اختيار عامل التصفية سواء نص او فيديو...الخ&nbsp;تعرض الفيديو المختار باللغة العربية ويمكن تحويله الى الإنجليزية من الخيار الموجود بالنافذة</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[13] +'"><ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن اختيار&nbsp;الموارد ذات صلة بها.</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[14] +'">',
                                    },{
                                        id:4,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نتيجة البحث عن الرياضيات علم الجبر.</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[15] +'"><ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">دليل لتعلم الرياضيات &nbsp; تظهر النافذة التالية</span></span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[16] +'">',
                                    },{
                                        id:5,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وعند اختيار مثال 2 الجمع والطرح عن طريق ثمار الفاكهة.</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[36] +'"><ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> مثال عن الكتلة وبها اختيارات للفرز على حسب المرحله ونوع المورد يمكن الاختيار منها ما يتناسب مع المعلم</span></span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[37] +'">',
                                    }

                                ],
                                featured:false,
                            },{
                                id:8,          
                                title:' مجتمع- DEN',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">استخدام مجتمع - </span><strong>DEN Discovery Education Network ( DEN ) Arabia</strong><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> هو مجتمع للممارسات يركز على ربط المعلمين بأهم مواردهم </span></span></span></h1> </li> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;وهو بعضهم البعض آيا كان دورك في التعليم ، فأنت تستحق بيئة تعلم داعمة تساعدك على تحسين ممارساتك ، وتوفر لك فرصا قيمة للتواصل ، وتعزز من مشاركة الأفكار الرائعة</span></span></span></h1> </li> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;وتركز على متعة التدريس والتعلم . سواء كنت في بداية رحلتك الرقمية أو قطعت شوطا طويلا فيها ، تعرف على ما يمكن أن يوفره لك مجتمع </span>DEN Arabia<span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> لإلهام تفكيرك ومساعدتك على تطوير ممارساتك.</span></span></span></h1> </li> <li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">مجتمع </span>DEN <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;يحتوى على ثلاثة أدوات </span>Spotlight on Strategies <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;- أفضل ممارسات المجتمع - ادوات وموارد المجتمع.</span></span></span></li> </ul>',
                                    },
                                    {
                                        id:2,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">مجتمع - </span></span><strong><span style="font-size:11.0pt"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">DEN - Spotlight on Strategies</span></span></strong><span dir="RTL" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> يقوم بعرض مجموعة من الاستراتيجيات التعليمية المتميزة هي استراتيجيات تعليمية ابداعية معتمدة على الأبحاث ، وضعت للمعلمين بواسطة استراتيجيات التدريس البسيطة تلك وسائط رقمية باساليب فعالة ، وعملية وذات معنی.</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[17] +'">',

                                    },{
                                        id:3,
                                        // content:'<ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن الانتقال الى استراتيجيات اخرى لعرضها وتحميلها ک</span> PDF ،  .</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[18] +'">',
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن الانتقال الى استراتيجيات اخرى لعرضها وتحميلها ک</span> PDF   .</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[18] +'"></br><img class="content_image" src="'+ app.images[2].img[38] +'"></br>',

                                    },{
                                        id:4,
                                        content:'<img class="content_image" src="'+ app.images[2].img[39] +'"></br><img class="content_image" src="'+ app.images[2].img[40] +'"><ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكنك أيضا تنزيل أضواء على استراتيجيات التعلم الأداء الحركي والتي يتم فيها عرض الاستراتيجية المستخدمة والخطوات الإجرائية التي يمكن للمعلم أن يتبعها داخل الفصل لتحقيق نوع من انواع من التعلم النشط مع تلاميذه</span> .</span></span></h1> </li> </ul>',

                                    },
                                    {
                                        id:4,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نختار تانى اداه&nbsp; وتوضح أفضل ممارسات المجتمع كالاتى .</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[19] +'"></br><img class="content_image" src="'+ app.images[2].img[41] +'"> <ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يقوم من خلال هذا الاختيار بعرض خبرات المعلمين والممارسات والأنشطة التي قام بها عدد من المعلمين من خلال  موقع Discovery education.</span></span></h1> </li> </ul> ',
                                    },{
                                        id:5,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">الاداه الثالثه أدوات وموارد المجتمع .</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[19] +'"></br><img class="content_image" src="'+ app.images[2].img[41] +'"> <ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يقوم من خلال هذا الاختيار بعرض خبرات المعلمين والممارسات والأنشطة التي قام بها عدد من المعلمين من خلال  موقع Discovery education.</span></span></h1> </li> </ul> ',
                                    },{
                                        id:6,
                                        content:'<img class="content_image" src="'+ app.images[2].img[42] +'"></br><img class="content_image" src="'+ app.images[2].img[43] +'">',
                                    },{
                                        id:7,
                                        content:'</br><img class="content_image" src="'+ app.images[2].img[44] +'"></br><img class="content_image" src="'+ app.images[2].img[45] +'">',

                                    }
                                    ,{
                                        id:8,
                                        content:'</br><img class="content_image" src="'+ app.images[2].img[47] +'"></br><img class="content_image" src="'+ app.images[2].img[49] +'"><ul dir="rtl">  <ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">هي عبارة عن مجموعة من الأدوات والموارد التي يمكن للمعلم ان يحملها ليشارك في مجتمع Discovery education.</span></span></h1> </li> </ul> ',
                                    }
                                ],
                                featured:false,
                            }    
                          
                        ],
                    },    {
                        id:6,
                        title:' Britannica',
                        color:'#4285F4',
                        parent_topic: true,
                        child_topics: [
                            {
                                id:5,          
                                title:'Britannica',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">تعتبر<strong> موسوعة بریتانیکا</strong> ناشر تعلیمی عالمی للمنتجات تعزز المعرفة و التعلم في أحد دور النشر ويقوم بنك المعرفة المصري بعرض المحتوى العلمي التي بها عند الدخول على قائمة مصادرنا. تحتوى هذه الشاشة على المنتجات التي تقدمها لنا موسوعة </span></span><strong><span style="font-size:11.0pt"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">Britannica</span></span></strong><span dir="RTL" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> وهي :</span></span></h1> </li> <li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif">&nbsp;Britannica Academic</span></span></li> <li> <p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif">&nbsp;Britannica school</span></span></p> </li> <li> <p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif">&nbsp;Britannica Library</span></span></p> </li> <li> <p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif">&nbsp;Britannica E &ndash; Books</span></span></p> </li> <li> <p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif">&nbsp;Britannica ImageQuest </span></span></p> </li> <li> <p dir="RTL" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وسوف نبدا مع </span>Britannica school </span></span></p> </li> </ul><img class="content_image" src="'+ app.images[2].img[20] +'">',
                                    }                   

                                ],
                                featured:false,
                            },
                            {
                                id:6,          
                                title:'Britannica school',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<img class="content_image" src="'+ app.images[2].img[50] +'"><ul dir="rtl"><pre dir="rtl"> <span style="font-size:14px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن اختيار ما يناسب المعلم وليكن<em><strong> </strong></em></span><em><strong>Britannica school</strong></em> </span></span></pre> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-SA" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">استخدام&nbsp; </span></span><strong><span style="font-size:11.0pt"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">Britannia school</span></span></strong><span dir="RTL" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> وهو مصدر تعلیمی تفاعلي على الانترنت لطلاب المدارس و المعلمين من المراحل الابتدائية الى الثانوية . فهي توفر ثلاثة مراحل التعليم : <strong>الأساسي</strong> ( <strong>المرحلة الإبتدائية </strong>- <strong>متوسط</strong> (<strong> المرحلة المتوسطه </strong>) <strong>المتقدم</strong> (<strong> المرحلة الثانوية</strong> ) للإستخدام المدرسي و في المنازل .</span></span></h1> </li> <li> <h1 dir="rtl" style="text-align:right"><span dir="RTL" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وقد وضع هذا المنتج لمساعدة تطوير الطلاب من المراحل المتقدمة الى المتطورة . وهذا الخيار يدعم الأهداف المنهجية للعديد من المواد و يقدم مختارات من الموسوعات و الصحف والمجلات و المصادر الاساسية و ايضا تشمل الصور و الفيديوهات و الدروس التفاعلية و الأنشطة والألعاب والملازم التعليمية و غيرها من ادوات البحث الطلاب . و توجه مختلف المستويات للمطالعة لكي تساعد على تحقيق تعليم ملائم متخصص لمختلف المستويات </span></span></h1> </li> </ul>',
        
                                    },{
                                        id:2,
                                        content:'<ul dir="rtl"><img class="content_image" src="'+ app.images[2].img[21] +'"><li> <h1 dir="rtl" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">اضغط على النص اعلى ناحيه اليسار  Britannica School سيتم عرض ثلاثة مستويات من خلالهما  المرحله الابتدائيه Elementary - المتوسطة Middle- الثانوية High </li> <li> <h1 dir="rtl" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">عند اختيار   Elementary و  اختيار طالب&nbsp;Student نرى&nbsp;<span dir="RTL">هذه الشاشة الأيقونات والواجهة والالوان واشكال تناسب المرحلة العمرية للتلاميذ ويتم عرض مقطع فيديو أو صورة للتلميذ ثم الاجابة على مجموعة من الاسئلة الموجود بجواره في صورة اختيار من متعدد والتحرك بين الاسئلة عن طريق الأسهم</span></span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[22] +'">',
                                    },{
                                        id:3,
                                        // content:'<ul dir="rtl"><img class="content_image" src="'+ app.images[2].img[23] +'"> <li> <h1 dir="rtl" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">كذلك تجد في الجزء الأسفل انه بإمكانك تصفح <span dir="LTR">ARTICLES</span> المقالات مجموعة من مقاطع فيديو <span dir="LTR">Media</span> , <span dir="LTR">A World Atlas</span> اطلس سيرة ذاتيه العلماء<span dir="LTR">biographies</span></span></span> </h1><pre dir="rtl"> ANIMAL KINGDOM عالم الحيوان FOR PREK - 2 STUDENTS الاطفال قبل المرحلة الابتدائية جولة الولايات المتحدة الأمريكية TOUR THE U.S.A GEOGRAPHY EXPLORER مستكشف جغرافي COMPARE COUNTRIES مقارنة البلدان</pre> </li> </ul>',
                                        content:'<img class="content_image" src="'+ app.images[2].img[23] +'"><h1 dir="rtl" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">كذلك تجد في الجزء الأسفل انه بإمكانك تصفح <span dir="LTR">ARTICLES</span> المقالات مجموعة من مقاطع فيديو <span dir="LTR">Media</span> , <span dir="LTR">A World Atlas</span> اطلس سيرة ذاتيه العلماء<span dir="LTR">biographies&nbsp;</span></span></span></h1> <h1 dir="rtl" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">ANIMAL KINGDOM عالم الحيوان FOR PREK - 2 STUDENTS الاطفال قبل المرحلة الابتدائية جولة الولايات المتحدة الأمريكية TOUR THE U.S.A</span></span></h1> <h1 dir="rtl" style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">GEOGRAPHY EXPLORER مستكشف جغرافي COMPARE COUNTRIES مقارنة البلدان</span></span></h1>',
                                    },{
                                        id:4,
                                        content:'<ul dir="rtl"> <li> <h1 style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">كذلك&nbsp;في حالة اختيار <span dir="LTR">&nbsp;<strong>educator</strong></span>معلم&nbsp;</span></span><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">يتم عرض ايقونة للمحتويات وكذلك خطط لشرح الدروس وامكانية الانضمام&nbsp;</span></span><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">للتواصل الاجتماعي الخاص ببريتانكا </span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[24] +'"><ul dir="rtl"> <li> <h1><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px"><span dir="RTL">وعمل تسجيل كالأتى</span></span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[25] +'">',
                                    },{
                                        id:5,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><strong><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">المرحلة المتوسطة <span dir="LTR">middle</span></span></span></strong></h1> <img class="content_image" src="'+ app.images[2].img[51] +'"> </li> </ul><img class="content_image" src="'+ app.images[2].img[26] +'"><p></p><img class="content_image" src="'+ app.images[2].img[27] +'">',
                                    },{
                                        id:6,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-family:Arial, sans-serif"><span style="font-size:14.6667px">لاختيار الدولتين لعمل المقارنة</span></span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[28] +'"></br><img class="content_image" src="'+ app.images[2].img[52] +'">',
                                    },{
                                        id:7,
                                        content:'<ul dir="rtl"> <li> <h1 style="text-align:right"><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px"><span dir="RTL">لعمل بحث في شريط البحث أعلى النافذة عن </span>solar system<span dir="RTL"> مع التوضيح لبعض الأمكانيات للتعامل مع المقال من حيث تكبير الخط وتصغيرة والطباعة وجدول محتويات للتحرك داخل المقال والاطلاع على مقالات اخري من مصادر أخري خارج البريتانكا ويمكن أيضا ارساله عبر البريد.</span></span></span></h1> </li> </ul></br><img class="content_image" src="'+ app.images[2].img[53] +'">',
                                    },{
                                        id:8,
                                        content:'<img class="content_image" src="'+ app.images[2].img[54] +'"></br><img class="content_image" src="'+ app.images[2].img[55] +'"></br><img class="content_image" src="'+ app.images[2].img[56] +'">',

                                    },{
                                        id:9,
                                        content:'<img class="content_image" src="'+ app.images[2].img[57] +'"></img></br><img class="content_image" src="'+ app.images[2].img[58] +'">',

                                    },{
                                        id:10,
                                        content:'<ul dir="rtl"> <li> <h1 dir="rtl"><strong><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">المرحلةالثانوية <span dir="LTR">High</span></span></span></strong></h1> <img class="content_image" src="'+ app.images[2].img[65] +'"> </li> </ul><img class="content_image" src="'+ app.images[2].img[66] +'"></br> <span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">نلاحظ أن الواجهة تختلف على حسب المرحلة العمرية </span></span>',

                                    },
                                    {
                                        id:11,
                                        content:'<ul dir="rtl"> <li> <h1><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">مثال لبحث قي السير الذاتية فلابد من تحديد اربع نقاط في البحث&nbsp;<strong>الحقبة الزمنية</strong>, <strong>الجنسية</strong>, <strong>الشهرة المكتسبة </strong>, والشخص <strong>ذكر</strong> أو <strong>انثي</strong>&nbsp;تظهر الشاشة التالية بها السادات والبرادعي أفتح اي شخصية وابدأ اتعرف عليها <span dir="RTL">.</span></h1> </li> </ul><img class="content_image" src="'+ app.images[2].img[30] +'"> <h1><span style="font-family:Arial,sans-serif"><span style="font-size:14.6667px">وهنا كنت نبحث عن الحائز على جائزة نوبل للسلام في مصر <span dir="RTL">.</span></span></span></h1> <img class="content_image" src="'+ app.images[2].img[59] +'">',
                                    }
        
                                ],
                                featured:false,
                            },
                            {
                                id:7,          
                                title:'Britannica ImageQuest',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<img class="content_image" src="'+ app.images[2].img[60] +'"><ul dir="rtl"> <li> <h1 dir="rtl"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> مثال للبحث عن صورة سور الصين العظيم great wall  of china  في شريط البحث بختار الصورة  من نتيجة البحث وتوجد امكانية لتحميلها وطباعتها وارسالها ميل كما يمكن اضافتها لألبوم الصور اذا كنت مسجل علي البريتانكا ولك حساب خاص فيها.</h1> </li>  </ul><img class="content_image" src="'+ app.images[2].img[61] +'">',
                                    },
                                    {
                                        id:2,
                                        content:'<img class="content_image" src="'+ app.images[2].img[62] +'">',
                                    }                       

                                ],
                                featured:false,
                            }, 
                            {
                                id:8,          
                                title:'Britannica E-Books',
                                color:'#4285F4',
                                pages:[
                                    {
                                        id:1,
                                        content:'<img class="content_image" src="'+ app.images[2].img[63] +'"><ul dir="rtl"> <li> <h1 dir="rtl"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> ومن شريط البحث ببحت عن الحضارة القديمة ancient civilizations وظهرت النتيجة المتعلقة بعنوان البحث كما يلي</h1> </li></ul><img class="content_image" src="'+ app.images[2].img[64] +'">',
                                    }

                                ],
                                featured:false,
                            }    
                          
                        ],
                    },
                
              
                    {
                        id:7,
                        title:' العبيكان',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages:[
                            {
                                id:1,
                               content:'<ul dir="rtl"> <li> <h1><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;أنشئت<strong> مكتبة العبيكان </strong>لكي تكون منارة للفكر والثقافة تضيء من المملكة العربية السعودية للعالم العربي كله ، وقد تبنت <strong>مكتبة العبيكان</strong> منذ إنشائها نهجا مبنية على تحمل مسؤوليتها الاجتماعية في نشر العلم والثقافة والمعرفة بين أبناء الوطن والمنطقة ، وهذا ما تجلى في إسهامها في عالم النشر والترجمة . إذ بلغت إصداراتها أكثر من ثلاث آلاف عنوان في كافة التخصصات وفروع العلم والمعرفة .</span></span></span></h1> </li> <li> <h1><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">تقوم بتوزيعها على مستوى العالم العربي عبر وكلائها ومكاتبها المنتشرة في العوالم العربية ، وعبر المشاركة في جميع المعارض الدولية على مستوى العالم . تعد مكتبة العبيكان أحد أكبر المكتبات في العالم العربي والشرق الأوسط ، فهي تمتد إلى </span><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">۲۰</span> <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">فرعا في جميع أنحاء المملكة ، تضم أكثر من مئة ألف من العناوين العربية والأجنبية توفرها لكل قارئ أو باحث أو طالب علم ، كما تضم مكتبة متخصصة للطفل تلبي كافة احتياجاتة المعرفية والتربوية .</span></span></span></h1> </li> </ul>',
                            },{
                                id:2,
                                content:'<ul dir="rtl"> <li> <h1><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وقد قامت المكتبة بإتاحة محتوى رقمي يخدم الاحتياجات التعليمية والبحثية والمعرفية للدارسين والباحثين والمثقفين المهتمين بالمحتوى العربي من خلال التطوير المستمر لمكتبة العبيكان الرقمية وقاعدة بيانات إثراء المعارف الرقمية والتي يمكن استخدامها من خلال منصة بحث وواجهات تعامل معيارية ، وآليات الفهرسة والتكشيف وفقا للمعايير الدولية وبما يحقق التكامل المعرفى والتكنولوجي في الوقت نفسه .</span></span></span></h1> </li> </ul>',

                            },
                            {
                                id:3,
                                content:'<h1 dir="rtl"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">وعند اختيار اثراء المعارف الرقمية كما في النافذة التالية</span></span></span></h1> <p><img class="content_image" src="'+ app.images[7].img[0] +'" /></p> <p dir="RTL" style="text-align:right"><span style="font-size:16px"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نقوم بكتابة ما نريد البحث عنه&nbsp; في خانة البحث ونختار ما نريد البحث فيه من العلوم الاجتماعية , العلوم الباحتة , الادب والفنون &nbsp;......الخ.</span></span></span></p> <p><img class="content_image" src="'+ app.images[7].img[1] +'" /></p>',

                            },{
                                id:4,
                                content:'<p dir="RTL" style="text-align:right"><span style="font-size:16px"><span dir="RTL" lang="AR-SA"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">توضح النافذة التالية عند اختيار&nbsp; المكتبة المدرسية من قائمة البحث </span></span></span></p> <p><img class="content_image" src="'+ app.images[7].img[2] +'" /></p> <p dir="RTL" style="text-align:right"><span style="font-size:16px"><span dir="RTL" lang="AR-SA"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند الضغط على الرابط للبحث داخل المكتبة المدرسية&nbsp;  &nbsp; يتم عرض مثال لعرض قصة يوسف وشجرة المانجو وكذلك&nbsp; البحث عن أعمال المؤلف عمر الصاوي وتنزيل نتيجة البحث في صورة </span></span><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">pdf</span><span dir="RTL" lang="AR-EG"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp; للاحتفاظ به على الكمبيوتر الخاص بك</span></span></span></p> <p><img class="content_image" src="'+ app.images[7].img[3] +'" /></p>',
                            },{
                                id:5,
                                content:'<img class="content_image" src="'+ app.images[7].img[4] +'" /></br><img class="content_image" src="'+ app.images[7].img[5] +'" /></br><img class="content_image" src="'+ app.images[7].img[6] +'" />',
                            },{
                                id:6,
                                content:'<img class="content_image" src="'+ app.images[7].img[13] +'" /></br><img class="content_image" src="'+ app.images[7].img[8] +'" /></br><img class="content_image" src="'+ app.images[7].img[9] +'" />'
                            },{
                                id:7,
                                content:'<img class="content_image" src="'+ app.images[7].img[10] +'" /></br><img class="content_image" src="'+ app.images[7].img[11] +'" /></br><img class="content_image" src="'+ app.images[7].img[12] +'" />'
                            },{

                            }
                        ],
                        featured:false,
                    }, {
                        id:8,
                        title:' Atomic Traning',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages:[{
                            id:1,
                            content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif">&nbsp;<strong>Atomic Training- on line training</strong><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"><em> </em>يمنح الوصول الغير محدود إلى الالاف من أشرطة الفيديو القصيرة لتحسين مهارات العمل مع التدريب المتعمق في </span>excel<span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> والفوتوشوب أو تعلم تقنيات وسائل الإعلام الاجتماعية القيمة مع الدروس على تويتر والمدونات.</span></span></span></li> <p></p> <img class="content_image" src="'+ app.images[8].img[0] +'" /></ul> <p dir="RTL" style="text-align:right"><span dir="RTL" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;لعمل حساب على ذلك المصدر نختار </span></span><span style="font-size:11.0pt"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;"><em><strong>Create new account</strong></em> </span></span></p><img class="content_image" src="'+ app.images[8].img[1] +'" />',
                        },{
                            id:2,
                            content:'<p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نقوم بإدخال البيانات المطلوبة&nbsp;</span></span></p><img class="content_image" src="'+ app.images[8].img[2] +'" /><p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">بعد التسجيل نقوم بإدخال </span></span><span style="font-size:11.0pt"><span style="font-family:&quot;Calibri&quot;,&quot;sans-serif&quot;">User name &amp; Password </span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;لتظهر النافذة التالية </span></span></p><img class="content_image" src="'+ app.images[8].img[3] +'" />',
                        },{
                            id:3,
                            content:'<p dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نختار&nbsp;<em><strong>&nbsp;</strong></em></span><em><strong>Browse Turtorial</strong></em><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> للاطلاع على&nbsp; المواد المقدمة</span></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> </span></span></p><img class="content_image" src="'+ app.images[8].img[4] +'" /><p dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نختار </span><em><strong>Microsoft training</strong></em></span></span><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> </span></span></p><img class="content_image" src="'+ app.images[8].img[5] +'" /><p dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">تعرض كل الفيديوهات المتعلقة بالموضوع اللي تم اختياره</span></p><img class="content_image" src="'+ app.images[8].img[12] +'" />',
                        },{
                            id:4,
                            content:'<p dir="rtl" style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ليتم عرض الاتى&nbsp;</span></span></span></p><img class="content_image" src="'+ app.images[8].img[6] +'" /><p></p><img class="content_image" src="'+ app.images[8].img[7] +'" />',
                        },{
                            id:5,
                            content:'<p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">واختيار الكورس المطلوب شرحة تحت مايكروسوفت وكل كورس يندرج تحته العناوين الفرعية الخاصة به ثم اختار رقم الاصدار من تلك البرنامج ويمكن اختيار عنوان فرعي.</span></span></p><img class="content_image" src="'+ app.images[8].img[8] +'" /><p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">تعرض كل الفيديوهات المتعلقة بالموضوع اللي تم اختيارة نختار موضوع يتم عرض الفيديو الخاص به</span></span></p><img class="content_image" src="'+ app.images[8].img[9] +'" /></p><img class="content_image" src="'+ app.images[8].img[13] +'" />',
                        },{
                            id:6,
                            content:'<p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">كل فيديو يتم الانتهاء من سماعة يكون له اللون الأخضر كالاتى&nbsp;</span></span></p><img class="content_image" src="'+ app.images[8].img[10] +'" /><p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عند اتمام الاستماع الى جميع الموديولات ومقاطع الفيديو ستحصل على شهادة اون لاين من الموقع كمايلى</span></span></p><img class="content_image" src="'+ app.images[8].img[11] +'" />'
                        },{
                            id:7,
                            content:'<p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكنك بعد ذلك الانتقال الى كورسات اخرى كما يلي&nbsp;</span></span></p><img class="content_image" src="'+ app.images[8].img[14] +'" /><p dir="rtl" style="text-align:right"><span dir="RTL" lang="AR-JO" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">الشاشة التالية توضح كيف يمكنك تحميل الشهادة الخاصة بك التي تعبر عن اختياز الكورس</span></span></p><img class="content_image" src="'+ app.images[8].img[15] +'" />'
                        }                           
                        ],
                        featured:false,

                    }, {
                        id:9,
                        title:'scientific American Arabic',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages:[ 
                            {
                                id:1,
                                content:'<ul dir="rtl"> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> للعلم  </span><strong>scientific American Arabic</strong></span></li></br><img class="content_image" src="'+ app.images[8].img[16] +'" /> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">التعريف بالمجلة   </span></span></li></br><img class="content_image" src="'+ app.images[8].img[17] +'" /></br></br><img class="content_image" src="'+ app.images[8].img[18] +'" /></ul> ',
                            },{
                                id:2,
                                content:'<ul dir="rtl"> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> ستجد مقالات و أخبار في شتى المجالات  </span></span></li></br><img class="content_image" src="'+ app.images[8].img[19] +'" /> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكنك تصفح بودكاست كما في النافذة التالية </span></span></li></br><img class="content_image" src="'+ app.images[8].img[20] +'" /></ul> ',

                            },{
                                id:3,
                                content:'<ul dir="rtl"> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> البودكاست (البث الصوتي) هو عبارة عن برنامج صوتي إذاعي ينتجه أشخاص عاديون أو مؤسسات , ويطرح موضوعات متعددة في جوانب الحياة والتعليم والسياسة  كما يمكنك تحميله.كما هو موضح في النافذة التالية كمثال  </span></span></li></br><img class="content_image" src="'+ app.images[8].img[21] +'" /> </br><li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">كما يمكنك الاشتراك بالنشرة الدورية  كما هو موضح بالشاشة لإرسال كل ما هو جديد علي البريد الالكتروني الخاص بك.</span></span></li></br><img class="content_image" src="'+ app.images[8].img[22] +'" /></ul> ',
                            },{
                                id:4,
                                content:'<ul dir="rtl"> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> وذلك بعد الحصول علي كافة البيانات لاتمام التسجيل كما هو موضح بالنافذة التالية  </span></span></li></br><img class="content_image" src="'+ app.images[8].img[23] +'" /></ul> ',
                            }
                        ],
                        featured:false,
                    }, {
                        id:10,
                        title:' Learn chemistry',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [ ],
                        pages:[{
                            id:1,
                            content:'<ul dir="rtl"> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">نقوم باختار </span><strong>learn chemistry</strong><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> &nbsp;الجمعية الملكية للكمياء من مصادرنا</span></span></li> <img class="content_image" src="'+ app.images[10].img[16] +'" /></br><li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ثم من قائمه المنتجات نختار  </span><strong>learn chemistry</strong></li></br><img class="content_image" src="'+ app.images[10].img[0] +'" /></br></br><img class="content_image" src="'+ app.images[10].img[17] +'" /></br></ul><ul dir="rtl">   </ul>',
                        },{
                            id:2,
                            content:'<ul dir="rtl"> <li>يمكنك تحديد العديد من الخيارات من القائمه المنسدلة على حسب اختيارك أولا الجمهور معلم أو طالب ثم قائمه نوع المصدر سواء كان فيديو أو تدريب أو لعبة أو مقاله&nbsp;</li></br> <li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">ومن القائمة الثالثة أختيار المرحلة العمرية</span>age group <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;ثم من القائمة الرابعة الموضوع </span>subject <span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">&nbsp;كذلك يوجد شريط للبحث لكتابة اي عنوان تريد البحث فيه في أعلى النافذة مثل الجزيىء </span>molecule<span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> يتم عرض كل ما يتعلق بنتائج البحث وتصقحها كما يمكن مشاركة النتائج على الفيس أو التويتر أو الجوجل بلاس,....</span></span></span></li></br> <img class="content_image" src="'+ app.images[10].img[1] +'" /></br></br><img class="content_image" src="'+ app.images[10].img[2] +'" /><ul dir="rtl"></ul>  ',

                        },
                        {
                            id:3,
                            content:'<ul dir="rtl"> <li><span dir="RTL" lang="AR-EG" style="font-size:11.0pt"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">من القائمة اختر&nbsp;مثال عن الجدول الدوري&nbsp;ليتم عرضه بالتفصيل </span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[3] +'" />  </ul>',
                        }
                    
                     ],
                        featured:false,
                    },
                   
                     {
                        id:12,
                        title:' OneClickDigital',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages:[{
                            id:1,
                            content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> one click digital من مصادرنا</span></span></span></li> </ul><img class="content_image" src="'+ app.images[11].img[1] +'" /></br><img class="content_image" src="'+ app.images[11].img[3] +'" /><h1 style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">عبارة عن كتب صوتية مسجلة وكذلك الكترونية قم بعمل حساب على الموقع للتمتع بمحتواه كما يمكنك من تحميل الكتب المختارة</span></span></span></h1><img class="content_image" src="'+ app.images[11].img[2] +'" />',
                        } ],
                        featured:false,
                    }, {
                        id:13,
                        title:' National Geographic',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages:[{
                            id:1,
                            content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يحتوي المصدرعلى مئات من الخرائط والكتب والفيديو والصور اختار من النافذة التالية ناشونال جيوجرافيك الناس والحيوانات والعالم</span></span></span></li> </ul><img class="content_image" src="'+ app.images[12].img[0] +'" /><h1 style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يوجد شريط للبحث عن عنوان معين وتصفح نتائج البحث</span></span></span></h1><img class="content_image" src="'+ app.images[12].img[1] +'" /><h1 style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">تصفح المجلات المتاحة في المصدر</span></span></span></h1><img class="content_image" src="'+ app.images[12].img[2] +'" />',
                        },
                            {
                                id:2,
                                content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">explore topics يمكن من خلالها تصفح حسب الموضوعات</span></span></span></li> </ul><img class="content_image" src="'+ app.images[12].img[3] +'" /><h1 style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">البحث داخل الصور </span></span></h1><img class="content_image" src="'+ app.images[12].img[4] +'" /><h1 style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">بعد فتح أى فيديو أو صورة يمكن طباعة التقرير ومشاركتة عبر البريد الالكتروني كذلك الاستماع الصوتي له</span></span></span></h1><img class="content_image" src="'+ app.images[12].img[9] +'" />',
                            }
                         ],
                        featured:false,
                    }, {
                        id:14,
                        title:'دار المنظومه',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages:[{
                            id:1,
                            content:'<img class="content_image" src="'+ app.images[12].img[5] +'" /><ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">دار المنظومة هي شركة سعودية متخصصة في مجال بناء وتطوير قواعد المعلومات العلمية المتخصصة في المجالات البحثية والأكاديمية</span></span></span></li> </ul> <img class="content_image" src="'+ app.images[12].img[6] +'" /><ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يوجد في أعلى الناقذة شريط للبحث لاجراء عملية البحث ويمكنك التصفح على حسب اختيار الموضوع في اسفل النافذة</span></span></span></li> </ul>',
                        },
                            {
                                id:1,
                                content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">مثال للبحث عن تطوير التعليم</span></span></span></li> </ul> <img class="content_image" src="'+ app.images[12].img[7] +'" /><ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">تصفح النتائج المتاحة واختيار اى منهما .</span></span></span></li> </ul><img class="content_image" src="'+ app.images[12].img[8] +'" /><ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> كما يمكنك الاحتفاظ بنسخة من البحث المعروض على جهاز الكومبيوتر الخاص بك.</span></span></span></li> </ul>',
                            }
                         ],
                        featured:false,
                    }
                ],
            },{
                id:6,
                icon:"img/undraw_everywhere_together_bdmn.svg",
                name:' بوابه الطلاب و المعلمون',
                topics:[
                    {
                        id:9,
                        title:' بوابه الطلاب و المعلمون',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<h3 style="text-align:right"><em><strong>&nbsp; بوابه الطلاب والمعلمون</strong></em></h3> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">تحتوى على العديد من الكتب الخاصة بالمقررات الدراسية ، بالاضافه الى العديد من المصادر المعرفيه والتعليميه من كبرى دور النشر العالمية وشركات الانتاج العالميه العامله فى هذا المجال ، سواء فى صورة نصوص أو الموسوعات أو المصادر المرجعيه أو مقاطع فيديو لتبسيط العلوم أو غيرها من الوسائط المتعددة الخاصه بذلك</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">&nbsp;بوابه مخصصه للتعليم فى مختلف المراحل العملية، ويمكنك التسجيل بها من خلال الضغط على اختيار بوابه الطلاب</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">&nbsp;سهله الاستخدام&nbsp;تحتوى على نظام بحث موحد مرن الاستخدام للبحث فى الاف المقررات الدراسية للعلوم المختلفه للمراحل الجامعيه وكذلك الكتب المرجعية من كبرى دور النشر العامله فى هذه المجال فضلا عن موسوعة بريتاتيكا للطلبة ومئات الالاف من الفيديوهات والصور الحقيقيه والتخليليه لتبسيط العلوم من قنوات ديسكفرى وناشيونال جيوجرافيك</span></li> </ul><img class="content_image" src="'+ app.images[3].img[0] +'">',
                            }
                        ]
                    }
                ],
            }, {
                id:7,
                icon:"img/child.svg",
                name:' بوابه الأطفال',
                topics:[
                    {
                        id:10,
                        color:'#3231cc',
                        title:' بوابة الأطفال',
                        pages:[
                            {
                                id:1,
                                content:'<ul dir="rtl"> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن للآباء الاستفادة من بنك المعرفة من خلال تعليم صغارهم عبر بوابة مخصصة للأطفال , تحت عنوان بوابة الاطفال فهي متاحة ضمن اختيارات التسجيل .</span></span></span></li> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن من خلالها إيصال المعلومات إلى أطفالك بطريقة تفاعلية, حيث تتيح البوابة نظام بسيط للتعامل مع الأطفال , كما أنها مدعمة بالوسائل البصرية والسمعية</span></span></span></li> <li style="text-align:right"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">. كما تحتوي على العديد من الأدوات المساعدة للآباء لتعليم أبنائهم.</span></span></span></li>  </ul> <p><img class="content_image" src="'+ app.images[4].img[0] +'" /></p>',
                            }],
                        featured:true,
                    },{
                        id:11,
                        color:'#3231cc',
                        title:' Me books',
                        pages:[{
                            id:1,
                            content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> عند اختيار Me Books</span></span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[6]  +'" /></br><img class="content_image" src="'+ app.images[10].img[13]  +'" />',
                        },{
                            id:2,
                            content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> ثم نختار Me books online</span></span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[7]  +'" /></br><ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> عمل تسجيل على me books اولا </span></span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[15]  +'" /></br></br><ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> ثم تنزيل me books على الموبايل والتمتع بالخدمات المقدمه كما يلى . </span></span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[9]  +'" /></br>',
                        },{
                            id:3,
                            content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> قم بفتح التطبيق وتسجيل الدخول باسم المستخدم وكلمة المرور التي قمت بإنشائها</span></span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[10]  +'" /><ul dir="rtl"><li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">بعد الضغط على login سوق تظهر لك الاتفاقية أو الشروط والاطلاع عليها ثم الضغط على موافق. من قائمة home أو My books سوف تجد مجموعة من الكتب  يمكن تحميلها , اضغط لتحميل الكتاب.</span></span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[11]  +'" />',
                        },{
                            id:4,
                            content:'<ul dir="rtl"> <li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;"> عند فتح الكتاب وتصفحه علي سبيل المثال إذا فتحت صفحة مثل التي بالصورة وفي أعلى النافذة ترى ألوان معينة قم بالضغط على أى لون سوف تجد أن مجموعة الصور والكلمات تم عمل ظل عليها إذا قمت بالضغط عليها وسوف تجد أن الشخصيات تتحدث بمعنى أنها ليست عبارة عن قصة فقط بل يوجد تفاعل.</span></span></span></li> </ul><img class="content_image" src="'+ app.images[10].img[12]  +'" /><ul dir="rtl"><li style="text-align: right;"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-family:&quot;Arial&quot;,&quot;sans-serif&quot;">يمكن أيضا التسجيل بصوت طفلك على الشخصية الموجودة بالقصة عن طريق الضغط على لوحة  الألوان ثم الضغط المطول على صورة الطفل ثم البدء في التسجيل وبعد ذلك نرفع يدنا ثم الضغط مرة أخري لاستماع التسجيل . من الممكن إعادة القصة إلى ما كانت عليه بدون التسجيل الذي قمنا بتسجيله  عن طريق السهم بالأسفل ثم الضغط على reset ومسح أى تسجيلات ثم okay .</span></span></span></li> </ul>',

                        }
                     ],
                        featured:false,
                    }
                ]
            },{
                id:8,
                icon:"img/research.svg",
                name:' بوابه الباحثين',
                topics:[
                    {
                        id:16,
                        color:'#3231cc',
                        title:'بوابةالباحثين',
                        pages:[{
                            id:1,
                            content:'<h3 style="text-align:right">اذا كنت من الباحثين او مهتما بمجال البحث العلمى&nbsp; &nbsp;&nbsp;</h3> <ul dir="rtl"> <li>فعليك التسجيل فى بوابة الباحثين وهى بوابه مخصصه</li> <li>تحتوى على اكبر ما وصل اليه العلم فى الجامعات البحثيه , والاف الدوريات العلميه المتخصصه</li> <li>بالاضافه الى لمئات الالاف من الكتب والمراجع العامه. وكذلك فواعد البيانات : وموسوعه بريتنكا وديسكفرى التعليميه</li> <li>هي بوابة يتطلب دخولها التسجيل على الموقع الإلكتروني وتحتوي على العديد من مصادر المعلومات الأكاديمية المتخصصة, بالإضافة إلى أدوات البحث لمختلف التخصصات من كبار . دور النشر والشركات العالمية, وتحتوي على واجهة تشغيل فعالة, إلى جانب نظام بحث فيدرالي متخصص وآلية تصفح متخصصة.</li> <li>نظام بحث موحد يتميز بالدفة والمرونة في الاستخدام ونظام التصفح الموضوعي لكافة التخصصات.</li> <li>جاءت أيضاً البوابة بنظام دعم اتخاذ القرارات الطبية وفقاً للمواصفات العالمية وإستنادا إلى الطب القائم على الدليل وكذلك خبرات المتخصصين دعماً لجهود الإرتقاء بالرعاية الصحية والعلاجية لجمهورية مصر العربية.</li> </ul><img class="content_image" src="'+ app.images[5].img[0] +'">',
                        }],
                        featured:true,
                    }
                ]
            }, {
                id:9,
                icon:"img/book.svg",
                name:'بوابه القراء',
                topics:[
                    {
                        id:17,
                        color:'#3231cc',
                        title:'بوابة القراء',
                        pages:[
                            {
                                id:1,
                                content:'<img class="content_image" src="'+ app.images[6].img[0] +'"><p style="text-align:right">تحتوى البوابه الخاصه بعموم القراء على المصادر المعرفيه المحليه والاقلميه والعالميه باللغه العربية والانجليزيه مدعمه بواجهه تشغيل وبحث سهله الاستخدام ومن أبرز<strong> المصادر</strong></p> <ul dir="rtl"> <li><strong>قناه ديسكفرى العالميه</strong></li> <li><strong>قناه ناشيونال جيوجرفيك التعليميه</strong> والتى توفر العديد من وسائل شرح وتبسيط العلوم المختلفه فى صورها المقروء والمسوعه والمرئيه</li> <li><strong>موسوعه بريتانيكا</strong> العامه الشهيره والتى توفر ملايين المقالات والفيديوهات والصور فى كل اتجاهات المعرفه بالاضافه الى أمهات الكتب التراثيه والادبيه من المكتبه البريطانيه باللغه العربيه والعديد من المصادر الاخرى كما تسعى البوابه الى التكامل المشروعات الوثائقيه والمعرفيه المحليه الموجوده فى الجهات والهيئات المحليه كمكتبه والازهر الشريف وغيرها</li> </ul>',
                            },{
                                id:2,
                                content:'<ul dir="rtl"> <li>تحتوى البوابه الخاصه بعموم القراء على المصادر المعرفيه المحليه والأقليميه والعالميه باللغه الانجليزيه مدعمه بواجهه تشغيل وبحث سهله الاستخدام ومن أبرزالمصادر <strong>قناه ديسكفرى العالميه</strong> و<strong>قناه ناشيونال جيوجرافيك التعليميه</strong>&nbsp; والتى توفر العديد من وسائل شرح وتبسيط العلوم المختلفه فى صورها المقروء والمسموعه والمرئيه كما تحتوى على موسوعه بريتاتيكا العامه الشهيره والتى توفر ملايين المقالات والفيديوهات والصور فى كل اتجاهات المعرفه بالاضافه الى أمهات الكتب التراثيه والادبيه من المكتبه البريطانيه باللغه العربية والعدديد من المصادر الاخرى كما تسعى البوابه الى التكامل المشروعات الوثائقيه والمعرفه المحليه الموجوده فى الجهات والهيئات المحليه مكتبة والأزهر الشريف وغيرها.</li> </ul><ul dir="rtl"> <li>تحتوى على مختلف المصادر المعرفيه والثقافيه لمختلف الاهتمامات للقراء من مختلف الصحف المحليه والعالميه والموسوعات العالمية.</li> </ul>',
                            },{
                                id:3,
                                content:'<ul dir="rtl"> <li>والعديد من المصادر المعرفية الخاصه بالهيئات المحلية والمكتبات العامة المحليه والعالمية سواء كانت فى صورة نصوص أو مقاطع فيديو لتبسيط العلوم من أشهر شركات الانتاج العالميه , وهى مزوده بواجهه تشغيل شهله الاستخدام ونظام بحث بسيط</li> </ul>',
                            }
                        ],
                        featured:true,
                    }
                ]
            },
            {
                id:10,
                icon:"img/more.svg",
                name:' أعرف أكثر عن بنك المعرفه',
                topics:[
                    {
                        id:18,
                        color:'#3231cc',
                        title:'اعرف أكثر عن بنك المعرفه',
                        parent_topic:false,
                        child_topics:[],
                        pages:[{
                            id:1,
                            content:'<p style="text-align:right"><span style="font-size:15px"><em><strong>&nbsp; للتعرف علي مزيد من المعلومات عن بنك المعرفه ادخل علي الراوبط التاليه </strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://youtu.be/qvQ-jZ6X_A8">التسجيل والبحث فى بنك المعرفه </a></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://youtu.be/4CR7ig7pA3w">بريتانكا ج1 </a></li><li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://youtu.be/3MWh-DYo1iI"> بنك المعرفة المصرى| كيفية البحث فى بريتانيكا ج2</a></li><li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://youtu.be/vP6K-MZcUuk">دار المنظومة </a></li><li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://youtu.be/AA_7fm9N3V4">الاشتراك في دار المنظومة </a></li><li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://youtu.be/qf4ybYtcwBM">كيفيه تصفية نتائج البحث فى دار المنظومة  </a></li><li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://youtu.be/eRZzwVrz--U">بنك المعرفة المصرى| كورسات كمبيوتر احترافية مجانية من Atomic Training  </a></li><li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://www.youtube.com/watch?v=tSZe5hk10lE">بنك المعرفة المصرى| مكتبة العبيكان ( تحديث جديد) 2018 </a></li><li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://www.youtube.com/watch?v=UOfk5cxGifY">EKB الشرح التفصيلي لبوابات موقع بنك المعرفة المصري </a></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://www.youtube.com/watch?v=d_d_cOmm2vg">بنك المعرفة المصرى| تحويل حساب المعلم إلى حساب باحثين </a></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px"></span> <A href="https://www.youtube.com/watch?v=6RKPh9S0YGU"> بنك المعرفة المصرى| WebEdTV بث يومى على Discovery Education ج4 </a></li></ul>',

                        }

                        ]
                    }
                ]
            },
            {
                id:11,
                name:'فريق العمل',
                icon:"img/team.svg",
                topics:[
                    {
                        id:19,
                        title:'فريق العمل',
                        color:'#4285F4',
                        parent_topic: false,
                        child_topics: [],
                        pages: [
                            {
                                id:1,
                                content:'<p style="text-align:right"><span style="font-size:16px"><em><strong>&nbsp; فريق العمــــل </strong></em></span></p> <ul> <li dir="rtl" style="text-align:right"><span style="font-size:14px">د.منى عصمت عبدالحميد</span></li> <li dir="rtl" style="text-align:right"><span style="font-size:14px">د.ناهد عماشة</span></li>  </ul>',
                            }
                        ]
                    }
                ],     

            },
            

]

app.initialize()