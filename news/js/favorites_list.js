$(document).ready(function () {
  // console.log( "ready!" );
  let mainMenu = $(".main_menu");
  let articleLarge = $("#article_large");
  renderMenu();
  renderArticleLarge();

  let btnLike = $(".btn-like");
  let arrListLike = JSON.parse(localStorage.getItem("listLike")) || [];
  $(document).on("click", ".btn-like", function (e) {
    e.preventDefault();
    let imgsrc = $(this).attr("src");
    let id = $(this).data('id');

    console.log(imgsrc,id);
    if (imgsrc == "./assets/img/heart_empty.png") {
      $(this).attr("src", "./assets/img/heart_full.png");
      arrListLike.push(id);     
    } else {
      $(this).attr("src", "./assets/img/heart_empty.png");
      arrListLike = arrListLike.filter(item => item != id);
    }
    localStorage.setItem('listLike',JSON.stringify(arrListLike));
  });

  function renderMenu() {
    $.ajax({
      type: "GET",
      url: "http://apiforlearning.zendvn.com/api/categories_news",
      data: {
        offset: 0,
        limit: 20,
      },
      dataType: "json",
      success: function (data) {
        let content = "";
        let contentMenuOther = "";
        for (let i = 0; i < data.length; i++) {
          let name = data[i].name;
          let link = data[i].link;
          let linkCategory = "category.html?id=" + data[i].id;
          if (i < 5) {
            content += `
            <li class="nav-item">
                <a class="nav-link" href="${linkCategory}">${name}</a>
            </li>
                `;
          } else {
            contentMenuOther += `
            <li class="nav-item"><a class="dropdown-item" href="${linkCategory}">${name}</a></li>
            `;
          }
        }
        let result =
          content +
          `
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh mục
                khác</a>
            <ul class="dropdown-menu">
                ${contentMenuOther}
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="favorites_list.html"><img src="./assets/img/playlist.png" alt="Danh sach yeu thich"title="Danh Sách Yêu Thích"></a>
        </li>
        `;
        mainMenu.html(result);
      },
    });
  }
  function renderArticleLarge() {
    $.ajax({
      type: "GET",
      url: "http://apiforlearning.zendvn.com/api/articles",
      data: {
        offset: 0,
        limit: 5,
      },
      dataType: "json",
      success: function (data) {
        let content = "";

        // let allComments = JSON.parse(localStorage.getItem("comments")) || [];
        // let comments = allComments.filter(function (element) {
        //   return element.article_id == id;
        // });

        for (let i = 0; i < data.length; i++) {
          if (arrListLike.includes(data[i].id) ){
            content += /*html*/ `
            <article class="post">${renderPost(data[i])}</article>
         `;
          }
         
        }
        articleLarge.html(content);
      },
    });
  }
  function renderPost(item) {
    let thumb = item.thumb;
    let title = item.title;
    let description = item.description;
    let pubDate = new Date(item.publish_date);
    let linkDetail = "detail.html?id=" + item.id;
    let linkCategory = "category.html?id=" + item.category.id;
    let categoryName = item.category.name;

    
    let allComments = JSON.parse(localStorage.getItem("comment")) || [];
    let comments = allComments.filter(function (element) {
      return element.artiles_id == item.id;
    });
    console.log(comments);

    let heart = arrListLike.includes(item.id) ? './assets/img/heart_full.png' : './assets/img/heart_empty.png';
   
    return /*html*/ `
            <div class="card shadow-lg">
              <figure class="card-img-top overlay overlay-1"><a href="${linkDetail}"> <img
                          src="${thumb}" alt="" /></a>
                  <figcaption>
                      <h5 class="from-top mb-0">Read More</h5>
                  </figcaption>
              </figure>
              <div class="card-body">
                  <div class="post-header">
                      <div class="post-category">
                          <a href="${linkCategory}" class="hover link-yellow" rel="category">${categoryName}</a>
                      </div>
                      <h2 class="post-title h3 mt-1 mb-3"><a class="link-navy"
                              href="${linkDetail}">${title}</a></h2>
                  </div>
                  <div class="post-content">
                      <p>${description}</p>
                  </div>          
              </div>           
              <div class="card-footer">
                  <ul class="post-meta d-flex mb-0">
                      <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${pubDate}</span></li>
                      <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${comments.length}<span>
                                    Comments</span></a></li>
                      <li class="post-likes ms-auto" ><img class="btn-like" data-id="${item.id}" src="${heart}" alt=""></li>
                  </ul>                 
              </div>
          </div>
    `;
  }
});
