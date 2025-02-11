import { Mail, Star, User } from "lucide-react";
import CheckSubscriptionStatus from "../../../components/CheckSubscriptionStatus";
import GetUserData from "../../../components/GetUserData";
import DeleteAccount from "../../../components/profile/DeleteAccount";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "src/app/components/ui/avatar";
import { Button } from "src/app/components/ui/button";
import CreateProductForm from "src/app/components/forms/CreateProductForm";
import CreateBlogForm from "src/app/components/forms/CreateBlogForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import UserDetails from "src/app/components/profile/UserDetails";
import MyProducts from "src/app/components/profile/MyProducts";
import Image from "next/image";
import MyBlogs from "src/app/components/blog/MyBlogs";
import Link from "next/link";
import { createTranslator } from "next-intl";

export default async function ProfilePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale;

  const messages = (await import(`../../../../../messages/${locale}.json`))
    .default;
  const t = createTranslator({ locale, messages });

  const userData = await GetUserData();
  const userId = userData?.id as string;

  // Get subscription status
  const isProMember = await CheckSubscriptionStatus();

  return (
    <section className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20 w-full">
      <h1 className="text-xl md:text-2xl font-medium text-center mb-10">
        {t("Profile.title")}
      </h1>

      <div className="flex flex-col gap-12">
        <div className="grid grid-cols-[1fr_3fr] max-lg:grid-cols-1 gap-10 md:gap-x-16 w-full rounded-2xl">
          {/* User details */}
          <div className="w-full flex justify-center">
            <div className="w-full min-w-[18rem] rounded-xl p-6 bg-muted shadow-md">
              {/* Avatar Section */}
              <div className="relative flex flex-col items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-full border-2 ${
                    isProMember ? "border-primary" : "border-muted-foreground"
                  } flex items-center justify-center overflow-hidden shadow-md`}
                >
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={
                        userData?.user_metadata?.avatar_url ||
                        "/assets/user.svg"
                      }
                      alt="user"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <AvatarFallback>
                      <Image
                        src="/assets/user.svg"
                        width={200}
                        height={200}
                        alt="user"
                        className="w-14 h-14 rounded-full"
                      />
                    </AvatarFallback>
                  </Avatar>
                </div>

                {isProMember && (
                  <div className="flex items-center gap-2  text-primary px-3 py-1 text-sm">
                    <Star className="size-6 fill-primary" />
                    <span className="text-base font-medium">
                      {t("Profile.pro")}
                    </span>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="text-center mt-6 space-y-2">
                {userData?.user_metadata?.user_name && (
                  <p className="text-sm font-medium text-foreground">
                    {userData?.user_metadata?.user_name}
                  </p>
                )}
                <p className="text-sm font-medium text-foreground">
                  {userData?.email}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-6 max-custom-xs:flex-col lg:flex-col justify-center items-center w-full">
                {!isProMember && (
                  <div className="flex justify-center">
                    <Link href={`/${locale}/pricing`}>
                      <Button
                        className=" text-white hover:bg-[#38CB89]/80 transition-all duration-300"
                        variant="default"
                      >
                        {t("Profile.subscribeButton")}
                      </Button>
                    </Link>
                  </div>
                )}
                <div className="flex justify-center">
                  <DeleteAccount userId={userId} />
                </div>
              </div>
            </div>
          </div>

          {/* Show create product form if user is a Pro member */}
          <Tabs defaultValue="account" className="w-full">
            {isProMember && (
              <TabsList className="w-full flex flex-wrap justify-center gap-3 bg-muted rounded-lg mb-6 h-auto">
                <TabsTrigger
                  value="account"
                  className="bg-background min-w-[80px] px-2 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                >
                  {t("Profile.AccountForm.title")}
                </TabsTrigger>

                <TabsTrigger
                  value="my products"
                  className="bg-background  min-w-[80px] px-2 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                >
                  {t("Profile.MyProductsForm.title")}
                </TabsTrigger>

                <TabsTrigger
                  value="my blogs"
                  className="bg-background  min-w-[80px] px-2 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                >
                  {t("Profile.MyBlogsForm.title")}
                </TabsTrigger>

                <TabsTrigger
                  value="add product"
                  className="bg-background  min-w-[80px] px-2 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                >
                  {t("Profile.AddProductForm.title")}
                </TabsTrigger>

                <TabsTrigger
                  value="add blog"
                  className="bg-background  min-w-[80px] px-2 py-1.5 text-xs sm:text-sm font-medium transition-all rounded-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-muted-foreground"
                >
                  {t("Profile.AddBlogForm.title")}
                </TabsTrigger>
              </TabsList>
            )}

            <div className="p-4 bg-muted rounded-xl shadow-md min-h-[16rem]">
              <TabsContent value="account" className="">
                <UserDetails locale={locale} />
              </TabsContent>
              {isProMember && (
                <>
                  <TabsContent value="my products">
                    <MyProducts locale={locale} />
                  </TabsContent>
                  <TabsContent value="my blogs">
                    <MyBlogs locale={locale} />
                  </TabsContent>
                  <TabsContent value="add product">
                    <CreateProductForm />
                  </TabsContent>
                  <TabsContent value="add blog">
                    <CreateBlogForm />
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
