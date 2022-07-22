$(document).ready(function () {
  let mainMenu = $(".main_menu");
  let articleLarge = $("#article_large");
  let articleSmall = $("#article_small");
  let titleLarge = $("#title_large");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  let API_URL =
    "http://apiforlearning.zendvn.com/public/api/categories_news/" +
    id +
    "/articles";

  renderMenu();
  renderArticleLarge();
  renderArticleSmall();

  // =================RENDER MENU================
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
          // if (i == data[i].id) {
          //   titleLarge.html(`<h1 class="display-1 mb-3">${name}</h1>`);
          // }
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
              </li>`;

        mainMenu.html(result);
      },
    });
  }
  // =================ARTICLE LARGE================
  function renderArticleLarge() {
    $.ajax({
      type: "GET",
      url: API_URL,
      data: "data",
      dataType: "json",
      success: function (data) {
        let content = "";
        let titleName = "";

        for (let i = 0; i < data.length; i++) {
          let linkDetail = "detail.html?id=" + data[i].id;
          let categoryName = data[i].category.name;
          console.log(data[i].category.name);

          titleName = `<h1 class="display-1 mb-3">${categoryName}</h1>`;
          content += `
               <article class="post">
               <div class="card">
                   <figure class="card-img-top overlay overlay-1 hover-scale"><a
                           href="${linkDetail}"><img src="${data[i].thumb}" alt="" /></a>
                       <figcaption>
                           <h5 class="from-top mb-0">Read More</h5>
                       </figcaption>
                   </figure>
                   <div class="card-body">
                       <div class="post-header">
                           <div class="post-category text-line">
                               <a href="#" class="hover" rel="category">Teamwork</a>
                           </div>
                           <!-- /.post-category -->
                           <h2 class="post-title mt-1 mb-0"><a class="link-dark"
                                   href="${linkDetail}">${data[i].title}</a>
                           </h2>
                       </div>
                       <!-- /.post-header -->
                       <div class="post-content">
                           <p>${data[i].description}</p>
                       </div>
                       <!-- /.post-content -->
                   </div>
                   <!--/.card-body -->
                   <div class="card-footer">
                       <ul class="post-meta d-flex mb-0">
                           <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${data[i].created_at}</span></li>
                           <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>By
                                       Sandbox</span></a></li>
                           <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>3<span>
                                       Comments</span></a></li>
                           <li class="post-likes ms-auto"><a href="#"><i
                                       class="uil uil-heart-alt"></i>3</a></li>
                       </ul>
                       <!-- /.post-meta -->
                   </div>
                   <!-- /.card-footer -->
               </div>
               <!-- /.card -->
           </article>
               `;
        }

        titleLarge.html(titleName);
        articleLarge.html(content);
      },
    });
  }
  //=================ARTICLE SMALL================
  function renderArticleSmall() {
    $.ajax({
      type: "GET",
      url: API_URL,
      data: "data",
      dataType: "json",
      success: function (data) {
        let content = "";
        for (let i = 0; i < data.length; i++) {
          let linkDetail = "detail.html?id=" + data[i].id;
          content += `
            <article class="item post col-md-6">
                                    <div class="card">
                                        <figure class="card-img-top overlay overlay-1 hover-scale"><a href="${linkDetail}"> <img
                                                    src="${data[i].thumb}" alt="" /></a>
                                            <figcaption>
                                                <h5 class="from-top mb-0">Read More</h5>
                                            </figcaption>
                                        </figure>
                                        <div class="card-body">
                                            <div class="post-header">
                                                <div class="post-category text-line">
                                                    <a href="#" class="hover" rel="category">Coding</a>
                                                </div>
                                                <!-- /.post-category -->
                                                <h2 class="post-title h3 mt-1 mb-3"><a class="link-dark"
                                                        href="${linkDetail}">${data[i].title}</a></h2>
                                            </div>
                                            <!-- /.post-header -->
                                            <div class="post-content">
                                                <p>${data[i].description}</p>
                                            </div>
                                            <!-- /.post-content -->
                                        </div>
                                        <!--/.card-body -->
                                        <div class="card-footer">
                                            <ul class="post-meta d-flex mb-0">
                                                <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${data[i].created_at}</span></li>
                                                <li class="post-comments"><a href="#"><i
                                                            class="uil uil-comment"></i>4</a></li>
                                                <li class="post-likes ms-auto"><a href="#"><i
                                                            class="uil uil-heart-alt"></i>5</a></li>
                                            </ul>
                                            <!-- /.post-meta -->
                                        </div>
                                        <!-- /.card-footer -->
                                    </div>
                                    <!-- /.card -->
                                </article>
            `;
        }
        articleSmall.html(content);
      },
    });
  }
});
